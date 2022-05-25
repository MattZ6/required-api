import faker from '@faker-js/faker';

import {
  UserNotFoundWithProvidedIdError,
  WrongPasswordError,
} from '@domain/errors';

import { UpdateUserPasswordUseCase } from '@application/usecases/user/UpdatePassword';

import { makeErrorMock, makeUserMock } from '../../../domain';
import {
  FindUserByIdRepositorySpy,
  CompareHashProviderSpy,
  GenerateHashProviderSpy,
  UpdateUserRepositorySpy,
  makeUpdateUserPasswordUseCaseInputMock,
} from '../../mocks';

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

  it('should call FindUserByIdRepository once with correct values', async () => {
    const findByIdSpy = jest.spyOn(findUserByIdRepositorySpy, 'findById');

    const input = makeUpdateUserPasswordUseCaseInputMock();

    await updateUserPasswordUseCase.execute(input);

    expect(findByIdSpy).toHaveBeenCalledTimes(1);
    expect(findByIdSpy).toHaveBeenCalledWith({ id: input.user_id });
  });

  it('should throw if FindUserByIdRepository throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(findUserByIdRepositorySpy, 'findById')
      .mockRejectedValueOnce(errorMock);

    const input = makeUpdateUserPasswordUseCaseInputMock();

    const promise = updateUserPasswordUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should throw UserNotFoundWithProvidedIdError if FindUserByIdRepository returns undefined', async () => {
    jest
      .spyOn(findUserByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce(undefined);

    const input = makeUpdateUserPasswordUseCaseInputMock();

    const promise = updateUserPasswordUseCase.execute(input);

    await expect(promise).rejects.toBeInstanceOf(
      UserNotFoundWithProvidedIdError
    );
  });

  it('should call CompareHashProvider once with correct values', async () => {
    const userMock = makeUserMock();

    jest
      .spyOn(findUserByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce(userMock);

    const compareSpy = jest.spyOn(compareHashProviderSpy, 'compare');

    const input = makeUpdateUserPasswordUseCaseInputMock();

    await updateUserPasswordUseCase.execute(input);

    expect(compareSpy).toHaveBeenCalledTimes(1);
    expect(compareSpy).toHaveBeenCalledWith({
      value: input.old_password,
      hashed_value: userMock.password_hash,
    });
  });

  it('should throw if CompareHashProvider throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(compareHashProviderSpy, 'compare')
      .mockRejectedValueOnce(errorMock);

    const input = makeUpdateUserPasswordUseCaseInputMock();

    const promise = updateUserPasswordUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should throw WrongPasswordError if CompareHashProvider returns false', async () => {
    jest.spyOn(compareHashProviderSpy, 'compare').mockResolvedValueOnce(false);

    const input = makeUpdateUserPasswordUseCaseInputMock();

    const promise = updateUserPasswordUseCase.execute(input);

    await expect(promise).rejects.toBeInstanceOf(WrongPasswordError);
  });

  it('should call GenerateHashProvider once with correct values', async () => {
    const hashSpy = jest.spyOn(generateHashProviderSpy, 'hash');

    const input = makeUpdateUserPasswordUseCaseInputMock();

    await updateUserPasswordUseCase.execute(input);

    expect(hashSpy).toHaveBeenCalledTimes(1);
    expect(hashSpy).toHaveBeenCalledWith({ value: input.new_password });
  });

  it('should throw if GenerateHashProvider throws', async () => {
    const error = makeErrorMock();

    jest.spyOn(generateHashProviderSpy, 'hash').mockRejectedValueOnce(error);

    const input = makeUpdateUserPasswordUseCaseInputMock();

    const promise = updateUserPasswordUseCase.execute(input);

    await expect(promise).rejects.toThrowError(error);
  });

  it('should call UpdateUserRepository once with correct values', async () => {
    const userMock = makeUserMock();

    jest
      .spyOn(findUserByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce(userMock);

    const hashedPassword = faker.internet.password();

    jest
      .spyOn(generateHashProviderSpy, 'hash')
      .mockResolvedValueOnce(hashedPassword);

    const updateSpy = jest.spyOn(updateUserRepositorySpy, 'update');

    const input = makeUpdateUserPasswordUseCaseInputMock();

    await updateUserPasswordUseCase.execute(input);

    expect(updateSpy).toHaveBeenCalledTimes(1);
    expect(updateSpy).toHaveBeenCalledWith({
      id: input.user_id,
      password_hash: hashedPassword,
    });
  });

  it('should throw if UpdateUserRepository throws', async () => {
    const error = makeErrorMock();

    jest.spyOn(updateUserRepositorySpy, 'update').mockRejectedValueOnce(error);

    const input = makeUpdateUserPasswordUseCaseInputMock();

    const promise = updateUserPasswordUseCase.execute(input);

    await expect(promise).rejects.toThrowError(error);
  });

  it('should return a user on success', async () => {
    const userMock = makeUserMock();

    jest
      .spyOn(updateUserRepositorySpy, 'update')
      .mockResolvedValueOnce(userMock);

    const input = makeUpdateUserPasswordUseCaseInputMock();

    const output = await updateUserPasswordUseCase.execute(input);

    expect(output).toEqual(userMock);
  });
});
