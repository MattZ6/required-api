import {
  UserNotFoundWithProvidedIdError,
  UserAlreadyExistsWithProvidedEmailError,
} from '@domain/errors';

import { UpdateProfileEmailController } from '@presentation/controllers/user/UpdateProfileEmail';
import {
  badRequest,
  notFound,
  conflict,
  noContent,
} from '@presentation/helpers/http';

import { makeErrorMock } from '../../../domain';
import {
  ValidationSpy,
  UpdateUserEmailUseCaseSpy,
  makeUpdateProfileEmailControllerRequestMock,
  makeValidationErrorMock,
} from '../../mocks';

let validation: ValidationSpy;
let updateUserEmailUseCaseSpy: UpdateUserEmailUseCaseSpy;

let updateProfileEmailController: UpdateProfileEmailController;

describe('UpdateProfileEmailController', () => {
  beforeEach(() => {
    validation = new ValidationSpy();
    updateUserEmailUseCaseSpy = new UpdateUserEmailUseCaseSpy();

    updateProfileEmailController = new UpdateProfileEmailController(
      validation,
      updateUserEmailUseCaseSpy
    );
  });

  it('should call Validation with correct values', async () => {
    const validateSpy = jest.spyOn(validation, 'validate');

    const request = makeUpdateProfileEmailControllerRequestMock();

    await updateProfileEmailController.handle(request);

    expect(validateSpy).toHaveBeenCalledTimes(1);
    expect(validateSpy).toHaveBeenCalledWith(request.body);
  });

  it('should throw if Validation throws', async () => {
    const error = makeErrorMock();

    jest.spyOn(validation, 'validate').mockImplementationOnce(() => {
      throw error;
    });

    const request = makeUpdateProfileEmailControllerRequestMock();

    const promise = updateProfileEmailController.handle(request);

    await expect(promise).rejects.toThrowError(error);
  });

  it('should return bad request (400) if Validation throws ValidationError', async () => {
    const error = makeValidationErrorMock();

    jest.spyOn(validation, 'validate').mockReturnValueOnce(error);

    const request = makeUpdateProfileEmailControllerRequestMock();

    const response = await updateProfileEmailController.handle(request);

    expect(response).toEqual(badRequest(error));
  });

  it('should call UpdateProfileEmailController once with correct values', async () => {
    const executeSpy = jest.spyOn(updateUserEmailUseCaseSpy, 'execute');

    const request = makeUpdateProfileEmailControllerRequestMock();

    await updateProfileEmailController.handle(request);

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith({
      user_id: request.user.id,
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
