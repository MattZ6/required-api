/* eslint-disable max-classes-per-file */
import { UserAlreadyExistsWithThisEmailError } from '@domain/errors';
import { IUserModel } from '@domain/models/User';

import { IGenerateHashProvider } from '@data/protocols/cryptography/hash';
import {
  CreateUserDTO,
  ICheckIfUserExistsByEmailRepository,
  ICreateUserRepository,
} from '@data/protocols/repositories/user';

import { CreateUserUseCase } from './CreateUser';

class GenerateHashProviderStub implements IGenerateHashProvider {
  async hash(value: string): Promise<string> {
    return value;
  }
}

class CheckIfUserExistsByEmailRepositoryStub
  implements ICheckIfUserExistsByEmailRepository
{
  async checkIfExistsByEmail(_: string): Promise<boolean> {
    return false;
  }
}

class CreateUserRepositoryStub implements ICreateUserRepository {
  async create(data: CreateUserDTO): Promise<IUserModel> {
    return {
      ...data,
      id: 'any-id',
      created_at: new Date(),
      updated_at: new Date(),
    };
  }
}

let checkIfUserExistsByEmailRepositoryStub: CheckIfUserExistsByEmailRepositoryStub;
let createUserRepository: CreateUserRepositoryStub;
let generateHashProviderStub: GenerateHashProviderStub;

let createUserUseCase: CreateUserUseCase;

describe('CreateUserUseCase', () => {
  beforeEach(() => {
    checkIfUserExistsByEmailRepositoryStub =
      new CheckIfUserExistsByEmailRepositoryStub();
    generateHashProviderStub = new GenerateHashProviderStub();
    createUserRepository = new CreateUserRepositoryStub();

    createUserUseCase = new CreateUserUseCase(
      checkIfUserExistsByEmailRepositoryStub,
      generateHashProviderStub,
      createUserRepository
    );
  });

  it('should call CheckIfUserExistsByEmailRepository with correct data', async () => {
    const checkIfExistsByEmailSpy = jest.spyOn(
      checkIfUserExistsByEmailRepositoryStub,
      'checkIfExistsByEmail'
    );

    const email = 'any@email.com';

    await createUserUseCase.execute({
      name: 'any-name',
      email,
      password: 'any-password',
    });

    expect(checkIfExistsByEmailSpy).toHaveBeenCalledWith(email);
  });

  it('should throw if CheckIfUserExistsByEmailRepository throws', async () => {
    jest
      .spyOn(checkIfUserExistsByEmailRepositoryStub, 'checkIfExistsByEmail')
      .mockRejectedValueOnce(new Error());

    const promise = createUserUseCase.execute({
      name: 'any-name',
      email: 'any@email.com',
      password: 'any-password',
    });

    await expect(promise).rejects.toThrow();
  });

  it('should call GenerateHashProvider with correct data', async () => {
    const hashSpy = jest.spyOn(generateHashProviderStub, 'hash');

    const password = 'any-password';

    await createUserUseCase.execute({
      name: 'any-name',
      email: 'any@email.com',
      password,
    });

    expect(hashSpy).toHaveBeenCalledWith(password);
  });

  it('should throw if GenerateHashProvider throws', async () => {
    jest
      .spyOn(generateHashProviderStub, 'hash')
      .mockRejectedValueOnce(new Error());

    const promise = createUserUseCase.execute({
      name: 'any-name',
      email: 'any@email.com',
      password: 'any-password',
    });

    await expect(promise).rejects.toThrow();
  });

  it('should call CreateUserRepositoryStub with correct data', async () => {
    const passwordHash = 'hashed-password';

    jest
      .spyOn(generateHashProviderStub, 'hash')
      .mockReturnValueOnce(Promise.resolve(passwordHash));

    const createSpy = jest.spyOn(createUserRepository, 'create');

    const name = 'any-name';
    const email = 'any@email.com';

    await createUserUseCase.execute({
      name,
      email,
      password: 'any-password',
    });

    expect(createSpy).toHaveBeenCalledWith({
      name,
      email,
      password_hash: passwordHash,
    });
  });

  it('should throw if CreateUserRepositoryStub throws', async () => {
    jest
      .spyOn(createUserRepository, 'create')
      .mockRejectedValueOnce(new Error());

    const promise = createUserUseCase.execute({
      name: 'any-name',
      email: 'any@email.com',
      password: 'any-password',
    });

    await expect(promise).rejects.toThrow();
  });

  it('should not be able to create an user with a email from another user', async () => {
    jest
      .spyOn(checkIfUserExistsByEmailRepositoryStub, 'checkIfExistsByEmail')
      .mockReturnValueOnce(Promise.resolve(true));

    const promise = createUserUseCase.execute({
      name: 'any-name',
      email: 'another-user@email.com',
      password: 'any-password',
    });

    await expect(promise).rejects.toBeInstanceOf(
      UserAlreadyExistsWithThisEmailError
    );
  });

  it('should be able to create a new user', async () => {
    const password_hash = 'hashed-password';

    jest
      .spyOn(generateHashProviderStub, 'hash')
      .mockReturnValueOnce(Promise.resolve(password_hash));

    const name = 'John Doe';
    const email = 'john-doe@email.com';

    const user = await createUserUseCase.execute({
      name,
      email,
      password: 'john-password',
    });

    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('created_at');
    expect(user).toHaveProperty('updated_at');
    expect(user).toHaveProperty('name', name);
    expect(user).toHaveProperty('email', email);
    expect(user).toHaveProperty('password_hash', password_hash);
  });
});
