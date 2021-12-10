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

    const user_id = 'any-id';

    await updateUserPasswordUseCase.execute({
      user_id,
      old_password: 'old-password',
      new_password: 'new-password',
    });

    expect(findByIdSpy).toHaveBeenCalledWith(user_id);
  });

  it('should throw if FindUserByIdRepository throws', async () => {
    jest
      .spyOn(findUserByIdRepositorySpy, 'findById')
      .mockRejectedValueOnce(new Error());

    const promise = updateUserPasswordUseCase.execute({
      user_id: 'any-id',
      old_password: 'old-password',
      new_password: 'new-password',
    });

    await expect(promise).rejects.toThrow();
  });

  it('should call CompareHashProvider with correct data', async () => {
    const userPassword = 'old-password';

    jest.spyOn(findUserByIdRepositorySpy, 'findById').mockReturnValueOnce(
      Promise.resolve({
        id: 'any-id',
        name: 'any-name',
        email: 'any@email.com',
        password_hash: userPassword,
        created_at: new Date(),
        updated_at: new Date(),
      })
    );

    const compareSpy = jest.spyOn(compareHashProviderSpy, 'compare');

    const old_password = 'password';

    await updateUserPasswordUseCase.execute({
      user_id: 'any-id',
      old_password,
      new_password: 'new-password',
    });

    expect(compareSpy).toHaveBeenCalledWith(old_password, userPassword);
  });

  it('should throw if CompareHashProvider throws', async () => {
    jest
      .spyOn(compareHashProviderSpy, 'compare')
      .mockRejectedValueOnce(new Error());

    const promise = updateUserPasswordUseCase.execute({
      user_id: 'any-id',
      old_password: 'old-password',
      new_password: 'new-password',
    });

    await expect(promise).rejects.toThrow();
  });

  it('should call GenerateHashProvider with correct data', async () => {
    const hashSpy = jest.spyOn(generateHashProviderSpy, 'hash');

    const new_password = 'new-password';

    await updateUserPasswordUseCase.execute({
      user_id: 'any-id',
      old_password: 'old-password',
      new_password,
    });

    expect(hashSpy).toHaveBeenCalledWith(new_password);
  });

  it('should throw if GenerateHashProvider throws', async () => {
    jest
      .spyOn(generateHashProviderSpy, 'hash')
      .mockRejectedValueOnce(new Error());

    const promise = updateUserPasswordUseCase.execute({
      user_id: 'any-id',
      old_password: 'old-password',
      new_password: 'new-password',
    });

    await expect(promise).rejects.toThrow();
  });

  it('should call UpdateUserRepository with correct data', async () => {
    const user: IUserModel = {
      id: 'any-id',
      name: 'any-name',
      email: 'any@email.com',
      password_hash: 'any-password',
      created_at: new Date(),
      updated_at: new Date(),
    };

    jest
      .spyOn(findUserByIdRepositorySpy, 'findById')
      .mockReturnValueOnce(Promise.resolve(user));

    const hashedPassword = 'hashed-password';

    jest
      .spyOn(generateHashProviderSpy, 'hash')
      .mockReturnValueOnce(Promise.resolve(hashedPassword));

    const updateSpy = jest.spyOn(updateUserRepositorySpy, 'update');

    await updateUserPasswordUseCase.execute({
      user_id: 'any-id',
      old_password: 'old-password',
      new_password: 'new-password',
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
      user_id: 'any-id',
      old_password: 'old-password',
      new_password: 'new-password',
    });

    await expect(promise).rejects.toThrow();
  });

  it('should not be able to update password of a non-existing user', async () => {
    jest
      .spyOn(findUserByIdRepositorySpy, 'findById')
      .mockReturnValueOnce(Promise.resolve(undefined));

    const promise = updateUserPasswordUseCase.execute({
      user_id: 'no-existing-user-id',
      old_password: 'old-password',
      new_password: 'new-password',
    });

    await expect(promise).rejects.toBeInstanceOf(UserNotFoundWithThisIdError);
  });

  it('should not be able to update password with wrong old password', async () => {
    jest
      .spyOn(compareHashProviderSpy, 'compare')
      .mockReturnValueOnce(Promise.resolve(false));

    const promise = updateUserPasswordUseCase.execute({
      user_id: 'no-existing-user-id',
      old_password: 'old-password',
      new_password: 'new-password',
    });

    await expect(promise).rejects.toBeInstanceOf(PasswordNotMatchError);
  });

  it('should be able to update user password', async () => {
    const newPasswordHash = 'new-password-hash';

    const user: IUserModel = {
      id: 'any-id',
      name: 'any-name',
      email: 'any@email.com',
      password_hash: 'password-hash',
      created_at: new Date(),
      updated_at: new Date(),
    };

    jest
      .spyOn(findUserByIdRepositorySpy, 'findById')
      .mockReturnValueOnce(Promise.resolve(user));

    jest
      .spyOn(generateHashProviderSpy, 'hash')
      .mockReturnValueOnce(Promise.resolve(newPasswordHash));

    await updateUserPasswordUseCase.execute({
      user_id: 'no-existing-user-id',
      old_password: 'old-password',
      new_password: 'new-password',
    });

    expect(user.password_hash).toBe(newPasswordHash);
  });
});
