import {
  UserAlreadyExistsWithProvidedEmailError,
  UserNotFoundWithProvidedIdError,
} from '@domain/errors';

import { UpdateProfileEmailController } from '@presentation/controllers/user/UpdateProfileEmail';
import { conflict, noContent, notFound } from '@presentation/helpers/http/http';

import { makeErrorMock } from '../../domain';
import {
  makeUpdateProfileEmailControllerRequestMock,
  UpdateUserEmailUseCaseSpy,
} from '../mocks';

let updateUserEmailUseCaseSpy: UpdateUserEmailUseCaseSpy;

let updateProfileEmailController: UpdateProfileEmailController;

describe('UpdateProfileEmailController', () => {
  beforeEach(() => {
    updateUserEmailUseCaseSpy = new UpdateUserEmailUseCaseSpy();

    updateProfileEmailController = new UpdateProfileEmailController(
      updateUserEmailUseCaseSpy
    );
  });

  it('should call UpdateProfileEmailController once with correct values', async () => {
    const executeSpy = jest.spyOn(updateUserEmailUseCaseSpy, 'execute');

    const request = makeUpdateProfileEmailControllerRequestMock();

    await updateProfileEmailController.handle(request);

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith({
      user_id: request.user_id,
      email: request.body.email,
    });
  });

  it('should throw if UpdateProfileEmailController throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(updateUserEmailUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const request = makeUpdateProfileEmailControllerRequestMock();

    const promise = updateProfileEmailController.handle(request);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return not found (404) if UpdateUserEmailUseCase throws UserNotFoundWithProvidedIdError', async () => {
    const error = new UserNotFoundWithProvidedIdError();

    jest
      .spyOn(updateUserEmailUseCaseSpy, 'execute')
      .mockRejectedValueOnce(error);

    const request = makeUpdateProfileEmailControllerRequestMock();

    const response = await updateProfileEmailController.handle(request);

    expect(response).toEqual(notFound(error));
  });

  it('should return conflict (409) if UpdateUserEmailUseCase throws UserAlreadyExistsWithProvidedEmailError', async () => {
    const error = new UserAlreadyExistsWithProvidedEmailError();

    jest
      .spyOn(updateUserEmailUseCaseSpy, 'execute')
      .mockRejectedValueOnce(error);

    const request = makeUpdateProfileEmailControllerRequestMock();

    const response = await updateProfileEmailController.handle(request);

    expect(response).toEqual(conflict(error));
  });

  it('should return no content (204) on success', async () => {
    const request = makeUpdateProfileEmailControllerRequestMock();

    const response = await updateProfileEmailController.handle(request);

    expect(response).toEqual(noContent());
  });
});
