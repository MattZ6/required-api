import { faker } from '@faker-js/faker';

import { UserNotFoundWithThisIdError } from '@domain/errors';
import { IUser } from '@domain/models/User';

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

    const user_id = faker.datatype.uuid();

    await updateUserNameUseCase.execute({
      user_id,
      name: faker.name.findName(),
    });

    expect(findByIdSpy).toHaveBeenCalledWith(user_id);
  });

  it('should throw if FindUserByIdRepository throws', async () => {
    jest
      .spyOn(findUserByIdRepositorySpy, 'findById')
      .mockRejectedValueOnce(new Error());

    const promise = updateUserNameUseCase.execute({
      user_id: faker.datatype.uuid(),
      name: faker.name.findName(),
    });

    await expect(promise).rejects.toThrow();
  });

  it('should call UpdateUserRepository with correct data', async () => {
    const user: IUser = {
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

    const updateSpy = jest.spyOn(updateUserRepositorySpy, 'update');

    const newName = faker.name.findName();

    await updateUserNameUseCase.execute({
      user_id: faker.datatype.uuid(),
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
      user_id: faker.datatype.uuid(),
      name: faker.name.findName(),
    });

    await expect(promise).rejects.toThrow();
  });

  it('should not be able to update name of a non-existing user', async () => {
    jest
      .spyOn(findUserByIdRepositorySpy, 'findById')
      .mockReturnValueOnce(Promise.resolve(undefined));

    const promise = updateUserNameUseCase.execute({
      user_id: faker.datatype.uuid(),
      name: faker.name.findName(),
    });

    await expect(promise).rejects.toBeInstanceOf(UserNotFoundWithThisIdError);
  });

  it('should be able to update user name', async () => {
    const user: IUser = {
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

    const updatedName = faker.name.findName();

    await updateUserNameUseCase.execute({
      user_id: faker.datatype.uuid(),
      name: updatedName,
    });

    expect(user.name).toBe(updatedName);
  });
});
