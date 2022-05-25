import { UserNotFoundWithProvidedIdError } from '@domain/errors';

import { UpdateUserNameUseCase } from '@application/usecases/user/UpdateName';

import { makeErrorMock, makeUserMock } from '../../../domain';
import {
  FindUserByIdRepositorySpy,
  UpdateUserRepositorySpy,
  makeUpdateUserNameUseCaseInputMock,
} from '../../mocks';

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

  it('should call FindUserByIdRepository once with correct values', async () => {
    const findByIdSpy = jest.spyOn(findUserByIdRepositorySpy, 'findById');

    const input = makeUpdateUserNameUseCaseInputMock();

    await updateUserNameUseCase.execute(input);

    expect(findByIdSpy).toHaveBeenCalledTimes(1);
    expect(findByIdSpy).toHaveBeenCalledWith({ id: input.user_id });
  });

  it('should throw if FindUserByIdRepository throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(findUserByIdRepositorySpy, 'findById')
      .mockRejectedValueOnce(errorMock);

    const input = makeUpdateUserNameUseCaseInputMock();

    const promise = updateUserNameUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should throw UserNotFoundWithProvidedIdError if FindUserByIdRepository returns undefined', async () => {
    jest
      .spyOn(findUserByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce(undefined);

    const input = makeUpdateUserNameUseCaseInputMock();

    const promise = updateUserNameUseCase.execute(input);

    await expect(promise).rejects.toBeInstanceOf(
      UserNotFoundWithProvidedIdError
    );
  });

  it('should call UpdateUserRepository once with correct values', async () => {
    const userMock = makeUserMock();

    jest
      .spyOn(findUserByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce(userMock);

    const updateSpy = jest.spyOn(updateUserRepositorySpy, 'update');

    const input = makeUpdateUserNameUseCaseInputMock();

    await updateUserNameUseCase.execute(input);

    expect(updateSpy).toHaveBeenCalledTimes(1);
    expect(updateSpy).toHaveBeenCalledWith({
      id: input.user_id,
      name: input.name,
    });
  });

  it('should throw if UpdateUserRepository throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(updateUserRepositorySpy, 'update')
      .mockRejectedValueOnce(errorMock);

    const input = makeUpdateUserNameUseCaseInputMock();

    const promise = updateUserNameUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return user on success', async () => {
    const userMock = makeUserMock();

    jest
      .spyOn(updateUserRepositorySpy, 'update')
      .mockResolvedValueOnce(userMock);

    const input = makeUpdateUserNameUseCaseInputMock();

    const output = await updateUserNameUseCase.execute(input);

    expect(output).toEqual(userMock);
  });
});
