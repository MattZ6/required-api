import {
  UserAlreadyExistsWithThisEmailError,
  UserNotFoundWithThisIdError,
} from '@domain/errors';
import { IUserModel } from '@domain/models/User';

import {
  ICheckIfUserExistsByEmailRepository,
  IFindUserByIdRepository,
  IUpdateUserRepository,
} from '@data/protocols/repositories/user';

import { UpdateUserEmailUseCase } from './UpdateUserEmail';

class FindUserByIdRepositoryStub implements IFindUserByIdRepository {
  async findById(id: string): Promise<IUserModel> {
    return {
      id,
      name: 'John Doe',
      email: 'john.doe@email.com',
      password_hash: 'passwordhash',
      created_at: new Date(),
      updated_at: new Date(),
    };
  }
}

class CheckIfUserExistsByEmailRepositoryStub
  implements ICheckIfUserExistsByEmailRepository
{
  async checkIfExistsByEmail(_: string): Promise<boolean> {
    return false;
  }
}

class UpdateUserRepositoryStub implements IUpdateUserRepository {
  async update(user: IUserModel): Promise<IUserModel> {
    return user;
  }
}

let findUserByIdRepositoryStub: FindUserByIdRepositoryStub;
let checkIfUserExistsByEmailRepositoryStub: CheckIfUserExistsByEmailRepositoryStub;
let updateUserRepositoryStub: UpdateUserRepositoryStub;

let updateUserEmailUseCase: UpdateUserEmailUseCase;

describe('UpdateUserEmailUseCase', () => {
  beforeEach(() => {
    findUserByIdRepositoryStub = new FindUserByIdRepositoryStub();
    checkIfUserExistsByEmailRepositoryStub =
      new CheckIfUserExistsByEmailRepositoryStub();
    updateUserRepositoryStub = new UpdateUserRepositoryStub();

    updateUserEmailUseCase = new UpdateUserEmailUseCase(
      findUserByIdRepositoryStub,
      checkIfUserExistsByEmailRepositoryStub,
      updateUserRepositoryStub
    );
  });

  it('should call FindUserByIdRepository with correct data', async () => {
    const findByIdSpy = jest.spyOn(findUserByIdRepositoryStub, 'findById');

    const user_id = 'any-id';

    await updateUserEmailUseCase.execute({
      user_id,
      email: 'any@email.com',
    });

    expect(findByIdSpy).toHaveBeenCalledWith(user_id);
  });

  it('should throw if FindUserByIdRepository throws', async () => {
    jest
      .spyOn(findUserByIdRepositoryStub, 'findById')
      .mockRejectedValueOnce(new Error());

    const promise = updateUserEmailUseCase.execute({
      user_id: 'any-id',
      email: 'any@email.com',
    });

    await expect(promise).rejects.toThrow();
  });

  it('should call CheckIfUserExistsByEmailRepository with correct data', async () => {
    const checkIfExistsByEmailSpy = jest.spyOn(
      checkIfUserExistsByEmailRepositoryStub,
      'checkIfExistsByEmail'
    );

    const email = 'any@email.com';

    await updateUserEmailUseCase.execute({
      user_id: 'any-id',
      email,
    });

    expect(checkIfExistsByEmailSpy).toHaveBeenCalledWith(email);
  });

  it('should throw if CheckIfUserExistsByEmailRepository throws', async () => {
    jest
      .spyOn(checkIfUserExistsByEmailRepositoryStub, 'checkIfExistsByEmail')
      .mockRejectedValueOnce(new Error());

    const promise = updateUserEmailUseCase.execute({
      user_id: 'any-id',
      email: 'any@email.com',
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
      .spyOn(findUserByIdRepositoryStub, 'findById')
      .mockReturnValueOnce(Promise.resolve(user));

    const updateSpy = jest.spyOn(updateUserRepositoryStub, 'update');

    const newEmail = 'updated@email.com';

    await updateUserEmailUseCase.execute({
      user_id: 'any-id',
      email: newEmail,
    });

    expect(updateSpy).toHaveBeenCalledWith({ ...user, email: newEmail });
  });

  it('should throw if UpdateUserRepository throws', async () => {
    jest
      .spyOn(updateUserRepositoryStub, 'update')
      .mockRejectedValueOnce(new Error());

    const promise = updateUserEmailUseCase.execute({
      user_id: 'any-id',
      email: 'any@email.com',
    });

    await expect(promise).rejects.toThrow();
  });

  it('should not be able to update name of a non-existing user', async () => {
    jest
      .spyOn(findUserByIdRepositoryStub, 'findById')
      .mockReturnValueOnce(Promise.resolve(undefined));

    const promise = updateUserEmailUseCase.execute({
      user_id: 'no-existing-user-id',
      email: 'any@email.com',
    });

    await expect(promise).rejects.toBeInstanceOf(UserNotFoundWithThisIdError);
  });

  it("should not be able to update the user's email if the email is from another user", async () => {
    jest
      .spyOn(checkIfUserExistsByEmailRepositoryStub, 'checkIfExistsByEmail')
      .mockReturnValueOnce(Promise.resolve(true));

    const promise = updateUserEmailUseCase.execute({
      user_id: 'any-id',
      email: 'another-user@email.com',
    });

    await expect(promise).rejects.toBeInstanceOf(
      UserAlreadyExistsWithThisEmailError
    );
  });

  it('should be able to update user email', async () => {
    const user: IUserModel = {
      id: 'any-id',
      name: 'John Doe',
      email: 'john.doe@email.com',
      password_hash: 'passwordhash',
      created_at: new Date(),
      updated_at: new Date(),
    };

    jest
      .spyOn(findUserByIdRepositoryStub, 'findById')
      .mockReturnValueOnce(Promise.resolve(user));

    const updatedEmail = 'updated@email.com';

    await updateUserEmailUseCase.execute({
      user_id: 'any-id',
      email: updatedEmail,
    });

    expect(user.email).toBe(updatedEmail);
  });
});
