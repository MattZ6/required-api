import {
  PasswordNotMatchError,
  UserNotFoundWithThisIdError,
} from '@domain/errors';
import { IUserModel } from '@domain/models/User';

import {
  ICompareHashProvider,
  IGenerateHashProvider,
} from '@data/protocols/cryptography/hash';
import {
  IFindUserByIdRepository,
  IUpdateUserRepository,
} from '@data/protocols/repositories/user';

import { UpdateUserPasswordUseCase } from './UpdateUserPassword';

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

class CompareHashProviderStub implements ICompareHashProvider {
  async compare(_: string, __: string): Promise<boolean> {
    return true;
  }
}

class GenerateHashProviderStub implements IGenerateHashProvider {
  async hash(value: string): Promise<string> {
    return value;
  }
}

class UpdateUserRepositoryStub implements IUpdateUserRepository {
  async update(user: IUserModel): Promise<IUserModel> {
    return user;
  }
}

let findUserByIdRepositoryStub: FindUserByIdRepositoryStub;
let compareHashProviderStub: CompareHashProviderStub;
let generateHashProviderStub: GenerateHashProviderStub;
let updateUserRepositoryStub: UpdateUserRepositoryStub;

let updateUserPasswordUseCase: UpdateUserPasswordUseCase;

describe('UpdateUserPasswordUseCase', () => {
  beforeEach(() => {
    findUserByIdRepositoryStub = new FindUserByIdRepositoryStub();
    compareHashProviderStub = new CompareHashProviderStub();
    generateHashProviderStub = new GenerateHashProviderStub();
    updateUserRepositoryStub = new UpdateUserRepositoryStub();

    updateUserPasswordUseCase = new UpdateUserPasswordUseCase(
      findUserByIdRepositoryStub,
      compareHashProviderStub,
      generateHashProviderStub,
      updateUserRepositoryStub
    );
  });

  it('should call FindUserByIdRepository with correct data', async () => {
    const findByIdSpy = jest.spyOn(findUserByIdRepositoryStub, 'findById');

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
      .spyOn(findUserByIdRepositoryStub, 'findById')
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

    jest.spyOn(findUserByIdRepositoryStub, 'findById').mockReturnValueOnce(
      Promise.resolve({
        id: 'any-id',
        name: 'any-name',
        email: 'any@email.com',
        password_hash: userPassword,
        created_at: new Date(),
        updated_at: new Date(),
      })
    );

    const compareSpy = jest.spyOn(compareHashProviderStub, 'compare');

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
      .spyOn(compareHashProviderStub, 'compare')
      .mockRejectedValueOnce(new Error());

    const promise = updateUserPasswordUseCase.execute({
      user_id: 'any-id',
      old_password: 'old-password',
      new_password: 'new-password',
    });

    await expect(promise).rejects.toThrow();
  });

  it('should call GenerateHashProvider with correct data', async () => {
    const hashSpy = jest.spyOn(generateHashProviderStub, 'hash');

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
      .spyOn(generateHashProviderStub, 'hash')
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
      .spyOn(findUserByIdRepositoryStub, 'findById')
      .mockReturnValueOnce(Promise.resolve(user));

    const hashedPassword = 'hashed-password';

    jest
      .spyOn(generateHashProviderStub, 'hash')
      .mockReturnValueOnce(Promise.resolve(hashedPassword));

    const updateSpy = jest.spyOn(updateUserRepositoryStub, 'update');

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
      .spyOn(updateUserRepositoryStub, 'update')
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
      .spyOn(findUserByIdRepositoryStub, 'findById')
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
      .spyOn(compareHashProviderStub, 'compare')
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
      .spyOn(findUserByIdRepositoryStub, 'findById')
      .mockReturnValueOnce(Promise.resolve(user));

    jest
      .spyOn(generateHashProviderStub, 'hash')
      .mockReturnValueOnce(Promise.resolve(newPasswordHash));

    await updateUserPasswordUseCase.execute({
      user_id: 'no-existing-user-id',
      old_password: 'old-password',
      new_password: 'new-password',
    });

    expect(user.password_hash).toBe(newPasswordHash);
  });
});
