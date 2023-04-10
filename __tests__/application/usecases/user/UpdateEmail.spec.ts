import { beforeEach, describe, expect, it, vitest } from 'vitest';

import {
  UserNotFoundWithProvidedIdError,
  UserAlreadyExistsWithProvidedEmailError,
} from '@domain/errors';

import { UpdateUserEmailUseCase } from '@application/usecases/user/UpdateEmail';

import { makeErrorMock, makeUserMock } from '../../../domain';
import {
  FindUserByIdRepositorySpy,
  CheckIfUserExistsByEmailRepositorySpy,
  UpdateUserRepositorySpy,
  makeUpdateUserEmailUseCaseInputMock,
} from '../../mocks';

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

  it('should call FindUserByIdRepository once with correct values', async () => {
    const findByIdSpy = vitest.spyOn(findUserByIdRepositorySpy, 'findById');

    const input = makeUpdateUserEmailUseCaseInputMock();

    await updateUserEmailUseCase.execute(input);

    expect(findByIdSpy).toHaveBeenCalledTimes(1);
    expect(findByIdSpy).toHaveBeenCalledWith({ id: input.user_id });
  });

  it('should throw if FindUserByIdRepository throws', async () => {
    const errorMock = makeErrorMock();

    vitest
      .spyOn(findUserByIdRepositorySpy, 'findById')
      .mockRejectedValueOnce(errorMock);

    const input = makeUpdateUserEmailUseCaseInputMock();

    const promise = updateUserEmailUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should throw UserNotFoundWithProvidedIdError if FindUserByIdRepository returns undefined', async () => {
    vitest
      .spyOn(findUserByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce(undefined);

    const input = makeUpdateUserEmailUseCaseInputMock();

    const promise = updateUserEmailUseCase.execute(input);

    await expect(promise).rejects.toBeInstanceOf(
      UserNotFoundWithProvidedIdError
    );
  });

  it('should call CheckIfUserExistsByEmailRepository once with correct values only if the email has changed', async () => {
    const checkIfExistsByEmailSpy = vitest.spyOn(
      checkIfUserExistsByEmailRepositorySpy,
      'checkIfExistsByEmail'
    );

    const input = makeUpdateUserEmailUseCaseInputMock();

    await updateUserEmailUseCase.execute(input);

    expect(checkIfExistsByEmailSpy).toHaveBeenCalledTimes(1);
    expect(checkIfExistsByEmailSpy).toHaveBeenCalledWith({
      email: input.email,
    });
  });

  it('should not call CheckIfUserExistsByEmailRepository if the email has not changed', async () => {
    const userMock = makeUserMock();

    vitest
      .spyOn(findUserByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce(userMock);

    const checkIfExistsByEmailSpy = vitest.spyOn(
      checkIfUserExistsByEmailRepositorySpy,
      'checkIfExistsByEmail'
    );

    const input = makeUpdateUserEmailUseCaseInputMock();

    input.email = `   ${userMock.email.toUpperCase()} `;

    await updateUserEmailUseCase.execute(input);

    expect(checkIfExistsByEmailSpy).not.toHaveBeenCalled();
  });

  it('should throw if CheckIfUserExistsByEmailRepository throws', async () => {
    const errorMock = makeErrorMock();

    vitest
      .spyOn(checkIfUserExistsByEmailRepositorySpy, 'checkIfExistsByEmail')
      .mockRejectedValueOnce(errorMock);

    const input = makeUpdateUserEmailUseCaseInputMock();

    const promise = updateUserEmailUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should throw UserAlreadyExistsWithProvidedEmailError if CheckIfUserExistsByEmailRepository returns true', async () => {
    vitest
      .spyOn(checkIfUserExistsByEmailRepositorySpy, 'checkIfExistsByEmail')
      .mockResolvedValueOnce(true);

    const input = makeUpdateUserEmailUseCaseInputMock();

    const promise = updateUserEmailUseCase.execute(input);

    await expect(promise).rejects.toBeInstanceOf(
      UserAlreadyExistsWithProvidedEmailError
    );
  });

  it('should call UpdateUserRepository once with correct values', async () => {
    const userMock = makeUserMock();

    vitest
      .spyOn(findUserByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce(userMock);

    const updateSpy = vitest.spyOn(updateUserRepositorySpy, 'update');

    const input = makeUpdateUserEmailUseCaseInputMock();

    await updateUserEmailUseCase.execute(input);

    expect(updateSpy).toBeCalledTimes(1);
    expect(updateSpy).toHaveBeenCalledWith({
      id: input.user_id,
      email: input.email,
    });
  });

  it('should throw if UpdateUserRepository throws', async () => {
    const errorMock = makeErrorMock();

    vitest
      .spyOn(updateUserRepositorySpy, 'update')
      .mockRejectedValueOnce(errorMock);

    const input = makeUpdateUserEmailUseCaseInputMock();

    const promise = updateUserEmailUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return user on success', async () => {
    const userMock = makeUserMock();

    vitest
      .spyOn(updateUserRepositorySpy, 'update')
      .mockResolvedValueOnce(userMock);

    const input = makeUpdateUserEmailUseCaseInputMock();

    const output = await updateUserEmailUseCase.execute(input);

    expect(output).toEqual(userMock);
  });
});
