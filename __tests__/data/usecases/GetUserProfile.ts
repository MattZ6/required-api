import { UserNotFoundWithProvidedIdError } from '@domain/errors';

import { GetProfileUseCase } from '@data/usecases/user/GetProfile';

import { makeErrorMock, makeUserMock } from '../../domain';
import {
  FindUserByIdRepositorySpy,
  makeGetUserProfileUseCaseInputMock,
} from '../mocks';

let findUserByIdRepositorySpy: FindUserByIdRepositorySpy;

let getProfileUseCase: GetProfileUseCase;

describe('GetUserProfileUseCase', () => {
  beforeEach(() => {
    findUserByIdRepositorySpy = new FindUserByIdRepositorySpy();

    getProfileUseCase = new GetProfileUseCase(findUserByIdRepositorySpy);
  });

  it('should call FindUserByIdRepository once with correct values', async () => {
    const findByIdSpy = jest.spyOn(findUserByIdRepositorySpy, 'findById');

    const input = makeGetUserProfileUseCaseInputMock();

    await getProfileUseCase.execute(input);

    expect(findByIdSpy).toHaveBeenCalledTimes(1);
    expect(findByIdSpy).toHaveBeenCalledWith({ id: input.user_id });
  });

  it('should throw if FindUserByIdRepository throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(findUserByIdRepositorySpy, 'findById')
      .mockRejectedValueOnce(errorMock);

    const input = makeGetUserProfileUseCaseInputMock();

    const promise = getProfileUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should UserNotFoundWithProvidedIdError if FindUserByIdRepository returns undefined', async () => {
    jest
      .spyOn(findUserByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce(undefined);

    const input = makeGetUserProfileUseCaseInputMock();

    const promise = getProfileUseCase.execute(input);

    await expect(promise).rejects.toBeInstanceOf(
      UserNotFoundWithProvidedIdError
    );
  });

  it('should return user on success', async () => {
    const userMock = makeUserMock();

    jest
      .spyOn(findUserByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce(userMock);

    const input = makeGetUserProfileUseCaseInputMock();

    const output = await getProfileUseCase.execute(input);

    expect(output).toEqual(userMock);
  });
});
