import {
  UserAlreadyExistsWithProvidedEmailError,
  UserNotFoundWithProvidedIdError,
} from '@domain/errors';

import { UpdateUserEmailUseCase } from '@data/usecases/user/UpdateUserEmail';

import { makeErrorMock, makeUserMock } from '../../domain';
import {
  CheckIfUserExistsByEmailRepositorySpy,
  FindUserByIdRepositorySpy,
  makeUpdateUserEmailUseCaseInputMock,
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

  it('should call FindUserByIdRepository once with correct values', async () => {
    const findByIdSpy = jest.spyOn(findUserByIdRepositorySpy, 'findById');

    const input = makeUpdateUserEmailUseCaseInputMock();

    await updateUserEmailUseCase.execute(input);

    expect(findByIdSpy).toHaveBeenCalledTimes(1);
    expect(findByIdSpy).toHaveBeenCalledWith({ id: input.user_id });
  });

  it('should throw if FindUserByIdRepository throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(findUserByIdRepositorySpy, 'findById')
      .mockRejectedValueOnce(errorMock);

    const input = makeUpdateUserEmailUseCaseInputMock();

    const promise = updateUserEmailUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should throw UserNotFoundWithProvidedIdError if FindUserByIdRepository returns undefined', async () => {
    jest
      .spyOn(findUserByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce(undefined);

    const input = makeUpdateUserEmailUseCaseInputMock();

    const promise = updateUserEmailUseCase.execute(input);

    await expect(promise).rejects.toBeInstanceOf(
      UserNotFoundWithProvidedIdError
    );
  });

  it('should call CheckIfUserExistsByEmailRepository once with correct values only if the email has changed', async () => {
    const checkIfExistsByEmailSpy = jest.spyOn(
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

    jest
      .spyOn(findUserByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce(userMock);

    const checkIfExistsByEmailSpy = jest.spyOn(
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

    jest
      .spyOn(checkIfUserExistsByEmailRepositorySpy, 'checkIfExistsByEmail')
      .mockRejectedValueOnce(errorMock);

    const input = makeUpdateUserEmailUseCaseInputMock();

    const promise = updateUserEmailUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should throw UserAlreadyExistsWithProvidedEmailError if CheckIfUserExistsByEmailRepository returns true', async () => {
    jest
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

    jest
      .spyOn(findUserByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce(userMock);

    const updateSpy = jest.spyOn(updateUserRepositorySpy, 'update');

    const input = makeUpdateUserEmailUseCaseInputMock();

    await updateUserEmailUseCase.execute(input);

    expect(updateSpy).toBeCalledTimes(1);
    expect(updateSpy).toHaveBeenCalledWith({ ...userMock, email: input.email });
  });

  it('should throw if UpdateUserRepository throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(updateUserRepositorySpy, 'update')
      .mockRejectedValueOnce(errorMock);

    const input = makeUpdateUserEmailUseCaseInputMock();

    const promise = updateUserEmailUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return user on success', async () => {
    const userMock = makeUserMock();

    jest
      .spyOn(updateUserRepositorySpy, 'update')
      .mockResolvedValueOnce(userMock);

    const input = makeUpdateUserEmailUseCaseInputMock();

    const output = await updateUserEmailUseCase.execute(input);

    expect(output).toEqual(userMock);
  });
});
