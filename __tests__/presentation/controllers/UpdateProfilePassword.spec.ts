import {
  WrongPasswordError,
  UserNotFoundWithProvidedIdError,
} from '@domain/errors';

import { UpdateProfilePasswordController } from '@presentation/controllers/user/UpdateProfilePassword';
import {
  noContent,
  notFound,
  unprocessableEntity,
} from '@presentation/helpers/http';

import { makeErrorMock } from '../../domain';
import {
  makeUpdateProfilePasswordControllerRequestMock,
  UpdateUserPasswordUseCaseSpy,
} from '../mocks';

let updateUserPasswordUseCaseSpy: UpdateUserPasswordUseCaseSpy;

let updateProfilePasswordController: UpdateProfilePasswordController;

describe('UpdateProfilePasswordController', () => {
  beforeEach(() => {
    updateUserPasswordUseCaseSpy = new UpdateUserPasswordUseCaseSpy();

    updateProfilePasswordController = new UpdateProfilePasswordController(
      updateUserPasswordUseCaseSpy
    );
  });

  it('should call UpdateProfilePasswordController once with correct data', async () => {
    const executeSpy = jest.spyOn(updateUserPasswordUseCaseSpy, 'execute');

    const request = makeUpdateProfilePasswordControllerRequestMock();

    await updateProfilePasswordController.handle(request);

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith({
      user_id: request.user_id,
      old_password: request.body.old_password,
      new_password: request.body.password,
    });
  });

  it('should throw if UpdateProfilePasswordController throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(updateUserPasswordUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const request = makeUpdateProfilePasswordControllerRequestMock();

    const promise = updateProfilePasswordController.handle(request);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return not found (404) if UpdateUserPasswordUseCase throws UserNotFoundWithProvidedIdError', async () => {
    const error = new UserNotFoundWithProvidedIdError();

    jest
      .spyOn(updateUserPasswordUseCaseSpy, 'execute')
      .mockRejectedValueOnce(error);

    const request = makeUpdateProfilePasswordControllerRequestMock();

    const response = await updateProfilePasswordController.handle(request);

    expect(response).toEqual(notFound(error));
  });

  it('should return unprocessable entity (422) if UpdateUserPasswordUseCase throws WrongPasswordError', async () => {
    const error = new WrongPasswordError();

    jest
      .spyOn(updateUserPasswordUseCaseSpy, 'execute')
      .mockRejectedValueOnce(error);

    const request = makeUpdateProfilePasswordControllerRequestMock();

    const response = await updateProfilePasswordController.handle(request);

    expect(response).toEqual(unprocessableEntity(error));
  });

  it('should return no content (204) on success', async () => {
    const request = makeUpdateProfilePasswordControllerRequestMock();

    const response = await updateProfilePasswordController.handle(request);

    expect(response).toEqual(noContent());
  });
});
