import { faker } from '@faker-js/faker';

import {
  PasswordNotMatchError,
  UserNotFoundWithThisEmailError,
} from '@domain/errors';

import { AuthenticateUserUseCase } from '@data/usecases/user/AuthenticateUser';

import {
  CompareHashProviderSpy,
  EncryptProviderSpy,
  FindUserByEmailRepositorySpy,
} from '../mocks';

let findUserByEmailRepositorySpy: FindUserByEmailRepositorySpy;
let compareHashProviderSpy: CompareHashProviderSpy;
let encryptProviderSpy: EncryptProviderSpy;

let authenticateUserUseCase: AuthenticateUserUseCase;

describe('AuthenticateUserUseCase', () => {
  beforeEach(() => {
    findUserByEmailRepositorySpy = new FindUserByEmailRepositorySpy();
    compareHashProviderSpy = new CompareHashProviderSpy();
    encryptProviderSpy = new EncryptProviderSpy();

    authenticateUserUseCase = new AuthenticateUserUseCase(
      findUserByEmailRepositorySpy,
      compareHashProviderSpy,
      encryptProviderSpy
    );
  });

  it('should call FindUserByEmailRepository with correct data', async () => {
    const findByEmailSpy = jest.spyOn(
      findUserByEmailRepositorySpy,
      'findByEmail'
    );

    const email = faker.internet.email();

    await authenticateUserUseCase.execute({
      email,
      password: faker.internet.password(),
    });

    expect(findByEmailSpy).toHaveBeenCalledWith(email);
  });

  it('should throw if FindUserByEmailRepository throws', async () => {
    jest
      .spyOn(findUserByEmailRepositorySpy, 'findByEmail')
      .mockRejectedValueOnce(new Error());

    const promise = authenticateUserUseCase.execute({
      email: faker.internet.email(),
      password: faker.internet.password(),
    });

    await expect(promise).rejects.toThrow();
  });

  it('should call CompareHashProvider with correct data', async () => {
    const password_hash = faker.internet.password();

    jest.spyOn(findUserByEmailRepositorySpy, 'findByEmail').mockReturnValueOnce(
      Promise.resolve({
        id: faker.datatype.uuid(),
        name: faker.name.findName(),
        email: faker.internet.email(),
        password_hash,
        created_at: faker.datatype.datetime(),
        updated_at: faker.datatype.datetime(),
      })
    );

    const compareSpy = jest.spyOn(compareHashProviderSpy, 'compare');

    const password = faker.internet.password();

    await authenticateUserUseCase.execute({
      email: faker.internet.email(),
      password,
    });

    expect(compareSpy).toHaveBeenCalledWith(password, password_hash);
  });

  it('should throw if CompareHashProvider throws', async () => {
    jest
      .spyOn(compareHashProviderSpy, 'compare')
      .mockRejectedValueOnce(new Error());

    const promise = authenticateUserUseCase.execute({
      email: faker.internet.email(),
      password: faker.internet.password(),
    });

    await expect(promise).rejects.toThrow();
  });

  it('should call EncryptProvider with correct data', async () => {
    const id = faker.datatype.uuid();

    jest.spyOn(findUserByEmailRepositorySpy, 'findByEmail').mockReturnValueOnce(
      Promise.resolve({
        id,
        name: faker.name.findName(),
        email: faker.internet.email(),
        password_hash: faker.internet.password(),
        created_at: faker.datatype.datetime(),
        updated_at: faker.datatype.datetime(),
      })
    );

    const encryptSpy = jest.spyOn(encryptProviderSpy, 'encrypt');

    await authenticateUserUseCase.execute({
      email: faker.internet.email(),
      password: faker.internet.password(),
    });

    expect(encryptSpy).toHaveBeenCalledWith(id);
  });

  it('should throw if EncryptProvider throws', async () => {
    jest
      .spyOn(encryptProviderSpy, 'encrypt')
      .mockRejectedValueOnce(new Error());

    const promise = authenticateUserUseCase.execute({
      email: faker.internet.email(),
      password: faker.internet.password(),
    });

    await expect(promise).rejects.toThrow();
  });

  it('should not be able to authenticate a non-existing user', async () => {
    jest
      .spyOn(findUserByEmailRepositorySpy, 'findByEmail')
      .mockReturnValueOnce(Promise.resolve(undefined));

    const promise = authenticateUserUseCase.execute({
      email: faker.internet.email(),
      password: faker.internet.password(),
    });

    await expect(promise).rejects.toBeInstanceOf(
      UserNotFoundWithThisEmailError
    );
  });

  it('should not be able to authenticate user with wrong password', async () => {
    jest
      .spyOn(compareHashProviderSpy, 'compare')
      .mockReturnValueOnce(Promise.resolve(false));

    const promise = authenticateUserUseCase.execute({
      email: faker.internet.email(),
      password: faker.internet.password(),
    });

    await expect(promise).rejects.toBeInstanceOf(PasswordNotMatchError);
  });

  it('should be able to authenticate user', async () => {
    const token = faker.datatype.string(10);

    jest
      .spyOn(encryptProviderSpy, 'encrypt')
      .mockReturnValueOnce(Promise.resolve(token));

    const { access_token } = await authenticateUserUseCase.execute({
      email: faker.internet.email(),
      password: faker.internet.password(),
    });

    expect(access_token).toEqual(token);
  });
});
