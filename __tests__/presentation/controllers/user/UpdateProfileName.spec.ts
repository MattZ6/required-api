import { UserNotFoundWithProvidedIdError } from '@domain/errors';

import { UpdateProfileNameController } from '@presentation/controllers/user/UpdateProfileName';
import { badRequest, notFound, noContent } from '@presentation/helpers/http';

import { makeErrorMock } from '../../../domain';
import {
  ValidationSpy,
  UpdateUserNameUseCaseSpy,
  makeUpdateProfileNameControllerRequestMock,
  makeValidationErrorMock,
} from '../../mocks';

let validation: ValidationSpy;
let updateUserNameUseCaseSpy: UpdateUserNameUseCaseSpy;

let updateProfileNameController: UpdateProfileNameController;

describe('UpdateProfileNameController', () => {
  beforeEach(() => {
    validation = new ValidationSpy();
    updateUserNameUseCaseSpy = new UpdateUserNameUseCaseSpy();

    updateProfileNameController = new UpdateProfileNameController(
      validation,
      updateUserNameUseCaseSpy
    );
  });

  it('should call Validation with correct values', async () => {
    const validateSpy = jest.spyOn(validation, 'validate');

    const request = makeUpdateProfileNameControllerRequestMock();

    await updateProfileNameController.handle(request);

    expect(validateSpy).toHaveBeenCalledTimes(1);
    expect(validateSpy).toHaveBeenCalledWith(request.body);
  });

  it('should throw if Validation throws', async () => {
    const error = makeErrorMock();

    jest.spyOn(validation, 'validate').mockImplementationOnce(() => {
      throw error;
    });

    const request = makeUpdateProfileNameControllerRequestMock();

    const promise = updateProfileNameController.handle(request);

    await expect(promise).rejects.toThrowError(error);
  });

  it('should return bad request (400) if Validation throws ValidationError', async () => {
    const error = makeValidationErrorMock();

    jest.spyOn(validation, 'validate').mockReturnValueOnce(error);

    const request = makeUpdateProfileNameControllerRequestMock();

    const response = await updateProfileNameController.handle(request);

    expect(response).toEqual(badRequest(error));
  });

  it('should call UpdateProfileNameController once with correct values', async () => {
    const executeSpy = jest.spyOn(updateUserNameUseCaseSpy, 'execute');

    const request = makeUpdateProfileNameControllerRequestMock();

    await updateProfileNameController.handle(request);

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith({
      user_id: request.user.id,
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
