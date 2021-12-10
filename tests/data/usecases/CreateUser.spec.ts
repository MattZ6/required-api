import { UserAlreadyExistsWithThisEmailError } from '@domain/errors';

import { CreateUserUseCase } from '@data/usecases/create-user/CreateUser';

import {
  CheckIfUserExistsByEmailRepositorySpy,
  CreateUserRepositorySpy,
  GenerateHashProviderSpy,
} from '../mocks';

let checkIfUserExistsByEmailRepositorySpy: CheckIfUserExistsByEmailRepositorySpy;
let generateHashProviderSpy: GenerateHashProviderSpy;
let createUserRepositorySpy: CreateUserRepositorySpy;

let createUserUseCase: CreateUserUseCase;

describe('CreateUserUseCase', () => {
  beforeEach(() => {
    checkIfUserExistsByEmailRepositorySpy =
      new CheckIfUserExistsByEmailRepositorySpy();
    generateHashProviderSpy = new GenerateHashProviderSpy();
    createUserRepositorySpy = new CreateUserRepositorySpy();

    createUserUseCase = new CreateUserUseCase(
      checkIfUserExistsByEmailRepositorySpy,
      generateHashProviderSpy,
      createUserRepositorySpy
    );
  });

  it('should call CheckIfUserExistsByEmailRepository with correct data', async () => {
    const checkIfExistsByEmailSpy = jest.spyOn(
      checkIfUserExistsByEmailRepositorySpy,
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
      .spyOn(checkIfUserExistsByEmailRepositorySpy, 'checkIfExistsByEmail')
      .mockRejectedValueOnce(new Error());

    const promise = createUserUseCase.execute({
      name: 'any-name',
      email: 'any@email.com',
      password: 'any-password',
    });

    await expect(promise).rejects.toThrow();
  });

  it('should call GenerateHashProvider with correct data', async () => {
    const hashSpy = jest.spyOn(generateHashProviderSpy, 'hash');

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
      .spyOn(generateHashProviderSpy, 'hash')
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
      .spyOn(generateHashProviderSpy, 'hash')
      .mockReturnValueOnce(Promise.resolve(passwordHash));

    const createSpy = jest.spyOn(createUserRepositorySpy, 'create');

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
      .spyOn(createUserRepositorySpy, 'create')
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
      .spyOn(checkIfUserExistsByEmailRepositorySpy, 'checkIfExistsByEmail')
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
      .spyOn(generateHashProviderSpy, 'hash')
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
