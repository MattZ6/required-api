import { UserNotFoundWithThisIdError } from '@domain/errors';
import { IUserModel } from '@domain/models/User';

import { UpdateUserNameUseCase } from '@data/usecases/update-user-name/UpdateUserName';

import { FindUserByIdRepositorySpy, UpdateUserRepositorySpy } from '../mocks';

let findUserByIdRepositorySpy: FindUserByIdRepositorySpy;
let updateUserRepositorySpy: UpdateUserRepositorySpy;

let updateUserNameUseCase: UpdateUserNameUseCase;

describe('UpdateUserNameUseCase', () => {
  beforeEach(() => {
    findUserByIdRepositorySpy = new FindUserByIdRepositorySpy();
    updateUserRepositorySpy = new UpdateUserRepositorySpy();

    updateUserNameUseCase = new UpdateUserNameUseCase(
      findUserByIdRepositorySpy,
      updateUserRepositorySpy
    );
  });

  it('should call FindUserByIdRepository with correct data', async () => {
    const findByIdSpy = jest.spyOn(findUserByIdRepositorySpy, 'findById');

    const user_id = 'any-id';

    await updateUserNameUseCase.execute({
      user_id,
      name: 'any-name',
    });

    expect(findByIdSpy).toHaveBeenCalledWith(user_id);
  });

  it('should throw if FindUserByIdRepository throws', async () => {
    jest
      .spyOn(findUserByIdRepositorySpy, 'findById')
      .mockRejectedValueOnce(new Error());

    const promise = updateUserNameUseCase.execute({
      user_id: 'any-id',
      name: 'any-name',
    });

    await expect(promise).rejects.toThrow();
  });

  it('should call UpdateUserRepository with correct data', async () => {
    const user: IUserModel = {
      id: 'any-id',
      name: 'John Doe',
      email: 'john.doe@email.com',
      password_hash: 'passwordhash',
      created_at: new Date(),
      updated_at: new Date(),
    };

    jest
      .spyOn(findUserByIdRepositorySpy, 'findById')
      .mockReturnValueOnce(Promise.resolve(user));

    const updateSpy = jest.spyOn(updateUserRepositorySpy, 'update');

    const newName = 'updated-name';

    await updateUserNameUseCase.execute({
      user_id: 'any-id',
      name: newName,
    });

    user.name = newName;

    expect(updateSpy).toHaveBeenCalledWith(user);
  });

  it('should throw if UpdateUserRepository throws', async () => {
    jest
      .spyOn(updateUserRepositorySpy, 'update')
      .mockRejectedValueOnce(new Error());

    const promise = updateUserNameUseCase.execute({
      user_id: 'any-id',
      name: 'any-ame',
    });

    await expect(promise).rejects.toThrow();
  });

  it('should not be able to update name of a non-existing user', async () => {
    jest
      .spyOn(findUserByIdRepositorySpy, 'findById')
      .mockReturnValueOnce(Promise.resolve(undefined));

    const promise = updateUserNameUseCase.execute({
      user_id: 'no-existing-user-id',
      name: 'any-name',
    });

    await expect(promise).rejects.toBeInstanceOf(UserNotFoundWithThisIdError);
  });

  it('should be able to update user name', async () => {
    const user: IUserModel = {
      id: 'any-id',
      name: 'John Doe',
      email: 'john.doe@email.com',
      password_hash: 'passwordhash',
      created_at: new Date(),
      updated_at: new Date(),
    };

    jest
      .spyOn(findUserByIdRepositorySpy, 'findById')
      .mockReturnValueOnce(Promise.resolve(user));

    const updatedName = 'any-name';

    await updateUserNameUseCase.execute({
      user_id: 'any-id',
      name: updatedName,
    });

    expect(user.name).toBe(updatedName);
  });
});
