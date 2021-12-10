import Faker from 'faker';

import {
  UserAlreadyExistsWithThisEmailError,
  UserNotFoundWithThisIdError,
} from '@domain/errors';
import { IUserModel } from '@domain/models/User';

import { UpdateUserEmailUseCase } from '@data/usecases/update-user-email/UpdateUserEmail';

import {
  CheckIfUserExistsByEmailRepositorySpy,
  FindUserByIdRepositorySpy,
  UpdateUserRepositorySpy,
} from '../mocks';

let findUserByIdRepositorySpy: FindUserByIdRepositorySpy;
let checkIfUserExistsByEmailRepositorySpy: CheckIfUserExistsByEmailRepositorySpy;
let updateUserRepositorySpy: UpdateUserRepositorySpy;

let updateUserEmailUseCase: UpdateUserEmailUseCase;

describe('UpdateUserEmailUseCase', () => {
  beforeEach(() => {
    findUserByIdRepositorySpy = new FindUserByIdRepositorySpy();
    checkIfUserExistsByEmailRepositorySpy =
      new CheckIfUserExistsByEmailRepositorySpy();
    updateUserRepositorySpy = new UpdateUserRepositorySpy();

    updateUserEmailUseCase = new UpdateUserEmailUseCase(
      findUserByIdRepositorySpy,
      checkIfUserExistsByEmailRepositorySpy,
      updateUserRepositorySpy
    );
  });

  it('should call FindUserByIdRepository with correct data', async () => {
    const findByIdSpy = jest.spyOn(findUserByIdRepositorySpy, 'findById');

    const user_id = Faker.datatype.uuid();

    await updateUserEmailUseCase.execute({
      user_id,
      email: Faker.internet.email(),
    });

    expect(findByIdSpy).toHaveBeenCalledWith(user_id);
  });

  it('should throw if FindUserByIdRepository throws', async () => {
    jest
      .spyOn(findUserByIdRepositorySpy, 'findById')
      .mockRejectedValueOnce(new Error());

    const promise = updateUserEmailUseCase.execute({
      user_id: Faker.datatype.uuid(),
      email: Faker.internet.email(),
    });

    await expect(promise).rejects.toThrow();
  });

  it('should call CheckIfUserExistsByEmailRepository with correct data', async () => {
    const checkIfExistsByEmailSpy = jest.spyOn(
      checkIfUserExistsByEmailRepositorySpy,
      'checkIfExistsByEmail'
    );

    const email = Faker.internet.email();

    await updateUserEmailUseCase.execute({
      user_id: Faker.datatype.uuid(),
      email,
    });

    expect(checkIfExistsByEmailSpy).toHaveBeenCalledWith(email);
  });

  it('should throw if CheckIfUserExistsByEmailRepository throws', async () => {
    jest
      .spyOn(checkIfUserExistsByEmailRepositorySpy, 'checkIfExistsByEmail')
      .mockRejectedValueOnce(new Error());

    const promise = updateUserEmailUseCase.execute({
      user_id: Faker.datatype.uuid(),
      email: Faker.internet.email(),
    });

    await expect(promise).rejects.toThrow();
  });

  it('should call UpdateUserRepository with correct data', async () => {
    const user: IUserModel = {
      id: Faker.datatype.uuid(),
      name: Faker.name.findName(),
      email: Faker.internet.email(),
      password_hash: Faker.internet.password(),
      created_at: Faker.datatype.datetime(),
      updated_at: Faker.datatype.datetime(),
    };

    jest
      .spyOn(findUserByIdRepositorySpy, 'findById')
      .mockReturnValueOnce(Promise.resolve(user));

    const updateSpy = jest.spyOn(updateUserRepositorySpy, 'update');

    const newEmail = Faker.internet.email();

    await updateUserEmailUseCase.execute({
      user_id: Faker.datatype.uuid(),
      email: newEmail,
    });

    expect(updateSpy).toHaveBeenCalledWith({ ...user, email: newEmail });
  });

  it('should throw if UpdateUserRepository throws', async () => {
    jest
      .spyOn(updateUserRepositorySpy, 'update')
      .mockRejectedValueOnce(new Error());

    const promise = updateUserEmailUseCase.execute({
      user_id: Faker.datatype.uuid(),
      email: Faker.internet.email(),
    });

    await expect(promise).rejects.toThrow();
  });

  it('should not be able to update name of a non-existing user', async () => {
    jest
      .spyOn(findUserByIdRepositorySpy, 'findById')
      .mockReturnValueOnce(Promise.resolve(undefined));

    const promise = updateUserEmailUseCase.execute({
      user_id: Faker.datatype.uuid(),
      email: Faker.internet.email(),
    });

    await expect(promise).rejects.toBeInstanceOf(UserNotFoundWithThisIdError);
  });

  it("should not be able to update the user's email if the email is from another user", async () => {
    jest
      .spyOn(checkIfUserExistsByEmailRepositorySpy, 'checkIfExistsByEmail')
      .mockReturnValueOnce(Promise.resolve(true));

    const promise = updateUserEmailUseCase.execute({
      user_id: Faker.datatype.uuid(),
      email: Faker.internet.email(),
    });

    await expect(promise).rejects.toBeInstanceOf(
      UserAlreadyExistsWithThisEmailError
    );
  });

  it('should be able to update user email', async () => {
    const user: IUserModel = {
      id: Faker.datatype.uuid(),
      name: Faker.name.findName(),
      email: Faker.internet.email(),
      password_hash: Faker.internet.password(),
      created_at: Faker.datatype.datetime(),
      updated_at: Faker.datatype.datetime(),
    };

    jest
      .spyOn(findUserByIdRepositorySpy, 'findById')
      .mockReturnValueOnce(Promise.resolve(user));

    const updatedEmail = Faker.internet.email();

    await updateUserEmailUseCase.execute({
      user_id: Faker.datatype.uuid(),
      email: updatedEmail,
    });

    expect(user.email).toBe(updatedEmail);
  });
});
