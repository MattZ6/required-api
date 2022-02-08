import { faker } from '@faker-js/faker';

import {
  PasswordNotMatchError,
  UserNotFoundWithThisIdError,
} from '@domain/errors';
import { IUserModel } from '@domain/models/User';

import { UpdateUserPasswordUseCase } from '@data/usecases/update-user-password/UpdateUserPassword';

import {
  CompareHashProviderSpy,
  FindUserByIdRepositorySpy,
  GenerateHashProviderSpy,
  UpdateUserRepositorySpy,
} from '../mocks';

let findUserByIdRepositorySpy: FindUserByIdRepositorySpy;
let compareHashProviderSpy: CompareHashProviderSpy;
let generateHashProviderSpy: GenerateHashProviderSpy;
let updateUserRepositorySpy: UpdateUserRepositorySpy;

let updateUserPasswordUseCase: UpdateUserPasswordUseCase;

describe('UpdateUserPasswordUseCase', () => {
  beforeEach(() => {
    findUserByIdRepositorySpy = new FindUserByIdRepositorySpy();
    compareHashProviderSpy = new CompareHashProviderSpy();
    generateHashProviderSpy = new GenerateHashProviderSpy();
    updateUserRepositorySpy = new UpdateUserRepositorySpy();

    updateUserPasswordUseCase = new UpdateUserPasswordUseCase(
      findUserByIdRepositorySpy,
      compareHashProviderSpy,
      generateHashProviderSpy,
      updateUserRepositorySpy
    );
  });

  it('should call FindUserByIdRepository with correct data', async () => {
    const findByIdSpy = jest.spyOn(findUserByIdRepositorySpy, 'findById');

    const user_id = faker.datatype.uuid();

    await updateUserPasswordUseCase.execute({
      user_id,
      old_password: faker.internet.password(),
      new_password: faker.internet.password(),
    });

    expect(findByIdSpy).toHaveBeenCalledWith(user_id);
  });

  it('should throw if FindUserByIdRepository throws', async () => {
    jest
      .spyOn(findUserByIdRepositorySpy, 'findById')
      .mockRejectedValueOnce(new Error());

    const promise = updateUserPasswordUseCase.execute({
      user_id: faker.datatype.uuid(),
      old_password: faker.internet.password(),
      new_password: faker.internet.password(),
    });

    await expect(promise).rejects.toThrow();
  });

  it('should call CompareHashProvider with correct data', async () => {
    const userPassword = faker.internet.password();

    jest.spyOn(findUserByIdRepositorySpy, 'findById').mockReturnValueOnce(
      Promise.resolve({
        id: faker.datatype.uuid(),
        name: faker.name.findName(),
        email: faker.internet.email(),
        password_hash: userPassword,
        created_at: faker.datatype.datetime(),
        updated_at: faker.datatype.datetime(),
      })
    );

    const compareSpy = jest.spyOn(compareHashProviderSpy, 'compare');

    const old_password = faker.internet.password();

    await updateUserPasswordUseCase.execute({
      user_id: faker.datatype.uuid(),
      old_password,
      new_password: faker.internet.password(),
    });

    expect(compareSpy).toHaveBeenCalledWith(old_password, userPassword);
  });

  it('should throw if CompareHashProvider throws', async () => {
    jest
      .spyOn(compareHashProviderSpy, 'compare')
      .mockRejectedValueOnce(new Error());

    const promise = updateUserPasswordUseCase.execute({
      user_id: faker.datatype.uuid(),
      old_password: faker.internet.password(),
      new_password: faker.internet.password(),
    });

    await expect(promise).rejects.toThrow();
  });

  it('should call GenerateHashProvider with correct data', async () => {
    const hashSpy = jest.spyOn(generateHashProviderSpy, 'hash');

    const new_password = faker.internet.password();

    await updateUserPasswordUseCase.execute({
      user_id: faker.datatype.uuid(),
      old_password: faker.internet.password(),
      new_password,
    });

    expect(hashSpy).toHaveBeenCalledWith(new_password);
  });

  it('should throw if GenerateHashProvider throws', async () => {
    jest
      .spyOn(generateHashProviderSpy, 'hash')
      .mockRejectedValueOnce(new Error());

    const promise = updateUserPasswordUseCase.execute({
      user_id: faker.datatype.uuid(),
      old_password: faker.internet.password(),
      new_password: faker.internet.password(),
    });

    await expect(promise).rejects.toThrow();
  });

  it('should call UpdateUserRepository with correct data', async () => {
    const user: IUserModel = {
      id: faker.datatype.uuid(),
      name: faker.name.findName(),
      email: faker.internet.email(),
      password_hash: faker.internet.password(),
      created_at: faker.datatype.datetime(),
      updated_at: faker.datatype.datetime(),
    };

    jest
      .spyOn(findUserByIdRepositorySpy, 'findById')
      .mockReturnValueOnce(Promise.resolve(user));

    const hashedPassword = faker.internet.password();

    jest
      .spyOn(generateHashProviderSpy, 'hash')
      .mockReturnValueOnce(Promise.resolve(hashedPassword));

    const updateSpy = jest.spyOn(updateUserRepositorySpy, 'update');

    await updateUserPasswordUseCase.execute({
      user_id: faker.datatype.uuid(),
      old_password: faker.internet.password(),
      new_password: faker.internet.password(),
    });

    expect(updateSpy).toHaveBeenCalledWith({
      ...user,
      password_hash: hashedPassword,
    });
  });

  it('should throw if UpdateUserRepository throws', async () => {
    jest
      .spyOn(updateUserRepositorySpy, 'update')
      .mockRejectedValueOnce(new Error());

    const promise = updateUserPasswordUseCase.execute({
      user_id: faker.datatype.uuid(),
      old_password: faker.internet.password(),
      new_password: faker.internet.password(),
    });

    await expect(promise).rejects.toThrow();
  });

  it('should not be able to update password of a non-existing user', async () => {
    jest
      .spyOn(findUserByIdRepositorySpy, 'findById')
      .mockReturnValueOnce(Promise.resolve(undefined));

    const promise = updateUserPasswordUseCase.execute({
      user_id: faker.datatype.uuid(),
      old_password: faker.internet.password(),
      new_password: faker.internet.password(),
    });

    await expect(promise).rejects.toBeInstanceOf(UserNotFoundWithThisIdError);
  });

  it('should not be able to update password with wrong old password', async () => {
    jest
      .spyOn(compareHashProviderSpy, 'compare')
      .mockReturnValueOnce(Promise.resolve(false));

    const promise = updateUserPasswordUseCase.execute({
      user_id: faker.datatype.uuid(),
      old_password: faker.internet.password(),
      new_password: faker.internet.password(),
    });

    await expect(promise).rejects.toBeInstanceOf(PasswordNotMatchError);
  });

  it('should be able to update user password', async () => {
    const newPasswordHash = 'new-password-hash';

    const user: IUserModel = {
      id: faker.datatype.uuid(),
      name: faker.name.findName(),
      email: faker.internet.email(),
      password_hash: faker.internet.password(),
      created_at: faker.datatype.datetime(),
      updated_at: faker.datatype.datetime(),
    };

    jest
      .spyOn(findUserByIdRepositorySpy, 'findById')
      .mockReturnValueOnce(Promise.resolve(user));

    jest
      .spyOn(generateHashProviderSpy, 'hash')
      .mockReturnValueOnce(Promise.resolve(newPasswordHash));

    await updateUserPasswordUseCase.execute({
      user_id: faker.datatype.uuid(),
      old_password: faker.internet.password(),
      new_password: faker.internet.password(),
    });

    expect(user.password_hash).toBe(newPasswordHash);
  });
});
