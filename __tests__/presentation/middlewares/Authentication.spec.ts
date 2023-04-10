import { beforeEach, describe, expect, it, vitest } from 'vitest';

import {
  AccessTokenNotProvidedError,
  InvalidAccessTokenError,
  AccessTokenExpiredError,
} from '@presentation/errors';
import { unauthorized, ok } from '@presentation/helpers/http';
import { AuthenticationMiddleware } from '@presentation/middlewares/Authentication';

import {
  VerifyCriptographyProviderSpy,
  makeVerifyCriptographyProviderOutputMock,
} from '../../application/mocks';
import { makeErrorMock } from '../../domain';
import { makeAuthenticationMiddlewareRequestMock } from '../mocks';

let verifyCriptographyProviderSpy: VerifyCriptographyProviderSpy;

let authenticationMiddleware: AuthenticationMiddleware;

describe('AuthenticationMiddleware', () => {
  beforeEach(() => {
    verifyCriptographyProviderSpy = new VerifyCriptographyProviderSpy();

    authenticationMiddleware = new AuthenticationMiddleware(
      verifyCriptographyProviderSpy
    );
  });

  it('should return unauthorized (401) if AuthenticationMiddleware throws a AccessTokenNotProvidedError', async () => {
    const request = makeAuthenticationMiddlewareRequestMock();

    request.headers['x-access-token'] = undefined;

    const response = await authenticationMiddleware.handle(request);

    expect(response).toEqual(unauthorized(new AccessTokenNotProvidedError()));
  });

  it('should call VerifyCriptographyProvider once with correct values', async () => {
    const verifySpy = vitest.spyOn(verifyCriptographyProviderSpy, 'verify');

    const request = makeAuthenticationMiddlewareRequestMock();

    await authenticationMiddleware.handle(request);

    expect(verifySpy).toHaveBeenCalledTimes(1);
    expect(verifySpy).toHaveBeenCalledWith({
      value: request.headers['x-access-token'],
    });
  });

  it('should throw if VerifyCriptographyProvider throws', async () => {
    const errorMock = makeErrorMock();

    vitest
      .spyOn(verifyCriptographyProviderSpy, 'verify')
      .mockRejectedValueOnce(errorMock);

    const request = makeAuthenticationMiddlewareRequestMock();

    const promise = authenticationMiddleware.handle(request);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return unauthorized (401) if VerifyCriptographyProvider throws a InvalidAccessTokenError', async () => {
    const errorMock = new InvalidAccessTokenError();

    vitest
      .spyOn(verifyCriptographyProviderSpy, 'verify')
      .mockRejectedValueOnce(errorMock);

    const request = makeAuthenticationMiddlewareRequestMock();

    const response = await authenticationMiddleware.handle(request);

    expect(response).toEqual(unauthorized(errorMock));
  });

  it('should return unauthorized (401) if VerifyCriptographyProvider throws a AccessTokenExpiredError', async () => {
    const errorMock = new AccessTokenExpiredError();

    vitest
      .spyOn(verifyCriptographyProviderSpy, 'verify')
      .mockRejectedValueOnce(errorMock);

    const request = makeAuthenticationMiddlewareRequestMock();

    const response = await authenticationMiddleware.handle(request);

    expect(response).toEqual(unauthorized(errorMock));
  });

  it('should return ok (200) on success', async () => {
    const outputMock = makeVerifyCriptographyProviderOutputMock();

    vitest
      .spyOn(verifyCriptographyProviderSpy, 'verify')
      .mockResolvedValueOnce(outputMock);

    const request = makeAuthenticationMiddlewareRequestMock();

    const response = await authenticationMiddleware.handle(request);

    expect(response).toEqual(ok({ user: { id: outputMock.subject } }));
  });
});
