import {
  PasswordNotMatchError,
  UserNotFoundWithThisEmailError,
} from '@domain/errors';
import { IUserModel } from '@domain/models/User';

import { IEncryptProvider } from '@data/protocols/cryptography/cryptography';
import { ICompareHashProvider } from '@data/protocols/cryptography/hash';
import { IFindUserByEmailRepository } from '@data/protocols/repositories/user';

import { AuthenticateUserUseCase } from './AuthenticateUser';

class CompareHashProviderStub implements ICompareHashProvider {
  async compare(_: string, __: string): Promise<boolean> {
    return true;
  }
}

class EncryptProviderStub implements IEncryptProvider {
  async encrypt(value: string): Promise<string> {
    return value;
  }
}

class FindUserByEmailRepositoryStub implements IFindUserByEmailRepository {
  async findByEmail(email: string): Promise<IUserModel> {
    return {
      id: 'any-id',
      name: 'John Doe',
      email,
      password_hash: 'passwordhash',
      created_at: new Date(),
      updated_at: new Date(),
    };
  }
}

let findUserByEmailRepositoryStub: FindUserByEmailRepositoryStub;
let compareHashProviderStub: CompareHashProviderStub;
let encryptProviderStub: EncryptProviderStub;

let authenticateUserUseCase: AuthenticateUserUseCase;

describe('AuthenticateUserUseCase', () => {
  beforeEach(() => {
    findUserByEmailRepositoryStub = new FindUserByEmailRepositoryStub();
    compareHashProviderStub = new CompareHashProviderStub();
    encryptProviderStub = new EncryptProviderStub();

    authenticateUserUseCase = new AuthenticateUserUseCase(
      findUserByEmailRepositoryStub,
      compareHashProviderStub,
      encryptProviderStub
    );
  });

  it('should call FindUserByEmailRepository with correct data', async () => {
    const findByEmailSpy = jest.spyOn(
      findUserByEmailRepositoryStub,
      'findByEmail'
    );

    const email = 'any@email.com';

    await authenticateUserUseCase.execute({
      email,
      password: 'any-password',
    });

    expect(findByEmailSpy).toHaveBeenCalledWith(email);
  });

  it('should throw if FindUserByEmailRepository throws', async () => {
    jest
      .spyOn(findUserByEmailRepositoryStub, 'findByEmail')
      .mockRejectedValueOnce(new Error());

    const promise = authenticateUserUseCase.execute({
      email: 'any@email.com',
      password: 'any-password',
    });

    await expect(promise).rejects.toThrow();
  });

  it('should call CompareHashProvider with correct data', async () => {
    const password_hash = 'password-hash';

    jest
      .spyOn(findUserByEmailRepositoryStub, 'findByEmail')
      .mockReturnValueOnce(
        Promise.resolve({
          id: 'any-id',
          name: 'any-name',
          email: 'any@email.com',
          password_hash,
          created_at: new Date(),
          updated_at: new Date(),
        })
      );

    const compareSpy = jest.spyOn(compareHashProviderStub, 'compare');

    const password = 'any-password';

    await authenticateUserUseCase.execute({
      email: 'any@email.com',
      password,
    });

    expect(compareSpy).toHaveBeenCalledWith(password, password_hash);
  });

  it('should throw if CompareHashProvider throws', async () => {
    jest
      .spyOn(compareHashProviderStub, 'compare')
      .mockRejectedValueOnce(new Error());

    const promise = authenticateUserUseCase.execute({
      email: 'any@email.com',
      password: 'any-password',
    });

    await expect(promise).rejects.toThrow();
  });

  it('should call EncryptProvider with correct data', async () => {
    const id = 'any-id';

    jest
      .spyOn(findUserByEmailRepositoryStub, 'findByEmail')
      .mockReturnValueOnce(
        Promise.resolve({
          id,
          name: 'any-name',
          email: 'any@email.com',
          password_hash: 'any-password',
          created_at: new Date(),
          updated_at: new Date(),
        })
      );

    const encryptSpy = jest.spyOn(encryptProviderStub, 'encrypt');

    await authenticateUserUseCase.execute({
      email: 'any@email.com',
      password: 'any-password',
    });

    expect(encryptSpy).toHaveBeenCalledWith(id);
  });

  it('should throw if EncryptProvider throws', async () => {
    jest
      .spyOn(encryptProviderStub, 'encrypt')
      .mockRejectedValueOnce(new Error());

    const promise = authenticateUserUseCase.execute({
      email: 'any@email.com',
      password: 'any-password',
    });

    await expect(promise).rejects.toThrow();
  });

  it('should not be able to authenticate a non-existing user', async () => {
    jest
      .spyOn(findUserByEmailRepositoryStub, 'findByEmail')
      .mockReturnValueOnce(Promise.resolve(undefined));

    const promise = authenticateUserUseCase.execute({
      email: 'any@email.com',
      password: 'any-password',
    });

    await expect(promise).rejects.toBeInstanceOf(
      UserNotFoundWithThisEmailError
    );
  });

  it('should not be able to authenticate user with wrong password', async () => {
    jest
      .spyOn(compareHashProviderStub, 'compare')
      .mockReturnValueOnce(Promise.resolve(false));

    const promise = authenticateUserUseCase.execute({
      email: 'any@email.com',
      password: 'any-password',
    });

    await expect(promise).rejects.toBeInstanceOf(PasswordNotMatchError);
  });

  it('should be able to authenticate user', async () => {
    const token = 'encrypted-value';

    jest
      .spyOn(encryptProviderStub, 'encrypt')
      .mockReturnValueOnce(Promise.resolve(token));

    const { access_token } = await authenticateUserUseCase.execute({
      email: 'any@email.com',
      password: 'any-password',
    });

    expect(access_token).toEqual(token);
  });
});
