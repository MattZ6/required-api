import { UserNotFoundWithProvidedIdError } from '@domain/errors';

import { GetUserProfileController } from '@presentation/controllers/user/GetUserProfile';
import { notFound, ok } from '@presentation/helpers/http/http';

import { makeErrorMock } from '../../domain';
import {
  GetUserProfileUseCaseSpy,
  makeGetUserProfileControllerRequestMock,
  makeGetUserProfileUseCaseOutputMock,
} from '../mocks';

let getProfileUseCaseSpy: GetUserProfileUseCaseSpy;

let getUserProfileController: GetUserProfileController;

describe('GetUserProfileController', () => {
  beforeEach(() => {
    getProfileUseCaseSpy = new GetUserProfileUseCaseSpy();

    getUserProfileController = new GetUserProfileController(
      getProfileUseCaseSpy
    );
  });

  it('should call GetUserProfileController once with correct values', async () => {
    const executeSpy = jest.spyOn(getProfileUseCaseSpy, 'execute');

    const request = makeGetUserProfileControllerRequestMock();

    await getUserProfileController.handle(request);

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith({ user_id: request.user_id });
  });

  it('should throw if GetUserProfileController throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(getProfileUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const request = makeGetUserProfileControllerRequestMock();

    const promise = getUserProfileController.handle(request);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return not found (404) if CreateUserUseCase throws UserNotFoundWithProvidedIdError', async () => {
    const error = new UserNotFoundWithProvidedIdError();

    jest.spyOn(getProfileUseCaseSpy, 'execute').mockRejectedValueOnce(error);

    const request = makeGetUserProfileControllerRequestMock();

    const response = await getUserProfileController.handle(request);

    expect(response).toEqual(notFound(error));
  });

  it('should return 200 on success', async () => {
    const outputMock = makeGetUserProfileUseCaseOutputMock();

    jest
      .spyOn(getProfileUseCaseSpy, 'execute')
      .mockResolvedValueOnce(outputMock);

    const requet = makeGetUserProfileControllerRequestMock();

    const response = await getUserProfileController.handle(requet);

    expect(response).toEqual(ok(outputMock));
  });
});
