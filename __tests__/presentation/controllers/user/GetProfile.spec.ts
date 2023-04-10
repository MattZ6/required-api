import { beforeEach, describe, expect, it, vitest } from 'vitest';

import { UserNotFoundWithProvidedIdError } from '@domain/errors';

import { GetUserProfileController } from '@presentation/controllers/user/GetProfile';
import { UserMapper } from '@presentation/dtos';
import { notFound, ok } from '@presentation/helpers/http';

import { makeErrorMock } from '../../../domain';
import {
  GetUserProfileUseCaseSpy,
  makeGetUserProfileControllerRequestMock,
  makeGetUserProfileUseCaseOutputMock,
} from '../../mocks';

let getUserProfileUseCaseSpy: GetUserProfileUseCaseSpy;

let getUserProfileController: GetUserProfileController;

describe('GetUserProfileController', () => {
  beforeEach(() => {
    getUserProfileUseCaseSpy = new GetUserProfileUseCaseSpy();

    getUserProfileController = new GetUserProfileController(
      getUserProfileUseCaseSpy
    );
  });

  it('should call GetUserProfileController once with correct values', async () => {
    const executeSpy = vitest.spyOn(getUserProfileUseCaseSpy, 'execute');

    const request = makeGetUserProfileControllerRequestMock();

    await getUserProfileController.handle(request);

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith({ user_id: request.user.id });
  });

  it('should throw if GetUserProfileController throws', async () => {
    const errorMock = makeErrorMock();

    vitest
      .spyOn(getUserProfileUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const request = makeGetUserProfileControllerRequestMock();

    const promise = getUserProfileController.handle(request);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return not found (404) if CreateUserUseCase throws UserNotFoundWithProvidedIdError', async () => {
    const error = new UserNotFoundWithProvidedIdError();

    vitest
      .spyOn(getUserProfileUseCaseSpy, 'execute')
      .mockRejectedValueOnce(error);

    const request = makeGetUserProfileControllerRequestMock();

    const response = await getUserProfileController.handle(request);

    expect(response).toEqual(notFound(error));
  });

  it('should return ok (200) with user profile on success', async () => {
    const outputMock = makeGetUserProfileUseCaseOutputMock();

    vitest
      .spyOn(getUserProfileUseCaseSpy, 'execute')
      .mockResolvedValueOnce(outputMock);

    const requet = makeGetUserProfileControllerRequestMock();

    const response = await getUserProfileController.handle(requet);

    expect(response).toEqual(ok(UserMapper.toProfileDTO(outputMock)));
  });
});
