import {
  UserTokenExpiredError,
  UserTokenNotFoundWithProvidedTokenError,
} from '@domain/errors';

import { RefreshUserAccessTokenController } from '@presentation/controllers/user/RefreshUserAccessToken';
import { AuthenticationMapper } from '@presentation/dtos';
import {
  badRequest,
  notFound,
  ok,
  unprocessableEntity,
} from '@presentation/helpers/http';

import { makeErrorMock } from '../../domain';
import {
  makeRefreshUserAccessTokenControllerRequestMock,
  makeRefreshUserAccessTokenUseCaseOutputMock,
  makeValidationErrorMock,
  RefreshUserAccessTokenUseCaseSpy,
  ValidationSpy,
} from '../mocks';

let validation: ValidationSpy;
let refreshUserAccessTokenUseCaseSpy: RefreshUserAccessTokenUseCaseSpy;

let refreshUserAccessTokenController: RefreshUserAccessTokenController;

describe('RefreshUserAccessTokenController', () => {
  beforeEach(() => {
    validation = new ValidationSpy();
    refreshUserAccessTokenUseCaseSpy = new RefreshUserAccessTokenUseCaseSpy();

    refreshUserAccessTokenController = new RefreshUserAccessTokenController(
      validation,
      refreshUserAccessTokenUseCaseSpy
    );
  });

  it('should call Validation with correct values', async () => {
    const validateSpy = jest.spyOn(validation, 'validate');

    const request = makeRefreshUserAccessTokenControllerRequestMock();

    await refreshUserAccessTokenController.handle(request);

    expect(validateSpy).toHaveBeenCalledTimes(1);
    expect(validateSpy).toHaveBeenCalledWith(request.body);
  });

  it('should throw if Validation throws', async () => {
    const error = makeErrorMock();

    jest.spyOn(validation, 'validate').mockImplementationOnce(() => {
      throw error;
    });

    const request = makeRefreshUserAccessTokenControllerRequestMock();

    const promise = refreshUserAccessTokenController.handle(request);

    await expect(promise).rejects.toThrowError(error);
  });

  it('should return bad request (400) if Validation throws ValidationError', async () => {
    const error = makeValidationErrorMock();

    jest.spyOn(validation, 'validate').mockImplementationOnce(() => {
      throw error;
    });

    const request = makeRefreshUserAccessTokenControllerRequestMock();

    const response = await refreshUserAccessTokenController.handle(request);

    expect(response).toEqual(badRequest(error));
  });

  it('should call RefreshUserAccessTokenUseCase once with correct values', async () => {
    const executeSpy = jest.spyOn(refreshUserAccessTokenUseCaseSpy, 'execute');

    const request = makeRefreshUserAccessTokenControllerRequestMock();

    await refreshUserAccessTokenController.handle(request);

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith({
      refresh_token: request.body.refresh_token,
    });
  });

  it('should throw if RefreshUserAccessTokenUseCase throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(refreshUserAccessTokenUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const request = makeRefreshUserAccessTokenControllerRequestMock();

    const promise = refreshUserAccessTokenController.handle(request);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return not found (404) if RefreshUserAccessTokenUseCase throws UserTokenNotFoundWithProvidedTokenError', async () => {
    const error = new UserTokenNotFoundWithProvidedTokenError();

    jest
      .spyOn(refreshUserAccessTokenUseCaseSpy, 'execute')
      .mockRejectedValueOnce(error);

    const request = makeRefreshUserAccessTokenControllerRequestMock();

    const response = await refreshUserAccessTokenController.handle(request);

    expect(response).toEqual(notFound(error));
  });

  it('should return unprocessable entity (422) if RefreshUserAccessTokenUseCase throws UserTokenExpiredError', async () => {
    const error = new UserTokenExpiredError();

    jest
      .spyOn(refreshUserAccessTokenUseCaseSpy, 'execute')
      .mockRejectedValueOnce(error);

    const request = makeRefreshUserAccessTokenControllerRequestMock();

    const response = await refreshUserAccessTokenController.handle(request);

    expect(response).toEqual(unprocessableEntity(error));
  });

  it('should return ok (200) with authentication on success', async () => {
    const output = makeRefreshUserAccessTokenUseCaseOutputMock();

    jest
      .spyOn(refreshUserAccessTokenUseCaseSpy, 'execute')
      .mockResolvedValueOnce(output);

    const request = makeRefreshUserAccessTokenControllerRequestMock();

    const response = await refreshUserAccessTokenController.handle(request);

    expect(response).toEqual(ok(AuthenticationMapper.toDTO(output)));
  });
});
