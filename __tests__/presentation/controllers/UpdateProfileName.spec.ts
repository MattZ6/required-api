import { UserNotFoundWithProvidedIdError } from '@domain/errors';

import { UpdateProfileNameController } from '@presentation/controllers/user/UpdateProfileName';
import { noContent, notFound } from '@presentation/helpers/http';

import { makeErrorMock } from '../../domain';
import {
  makeUpdateProfileNameControllerRequestMock,
  UpdateUserNameUseCaseSpy,
} from '../mocks';

let updateUserNameUseCaseSpy: UpdateUserNameUseCaseSpy;

let updateProfileNameController: UpdateProfileNameController;

describe('UpdateProfileNameController', () => {
  beforeEach(() => {
    updateUserNameUseCaseSpy = new UpdateUserNameUseCaseSpy();

    updateProfileNameController = new UpdateProfileNameController(
      updateUserNameUseCaseSpy
    );
  });

  it('should call UpdateProfileNameController once with correct values', async () => {
    const executeSpy = jest.spyOn(updateUserNameUseCaseSpy, 'execute');

    const request = makeUpdateProfileNameControllerRequestMock();

    await updateProfileNameController.handle(request);

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith({
      user_id: request.user_id,
      name: request.body.name,
    });
  });

  it('should throw if UpdateProfileNameController throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(updateUserNameUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const request = makeUpdateProfileNameControllerRequestMock();

    const promise = updateProfileNameController.handle(request);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return not found (404) if UpdateUserNameUseCase throws UserNotFoundWithProvidedIdError', async () => {
    const error = new UserNotFoundWithProvidedIdError();

    jest
      .spyOn(updateUserNameUseCaseSpy, 'execute')
      .mockRejectedValueOnce(error);

    const request = makeUpdateProfileNameControllerRequestMock();

    const response = await updateProfileNameController.handle(request);

    expect(response).toEqual(notFound(error));
  });

  it('should return no content (204) on success', async () => {
    const request = makeUpdateProfileNameControllerRequestMock();

    const response = await updateProfileNameController.handle(request);

    expect(response).toEqual(noContent());
  });
});
