import { beforeEach, describe, expect, it, vitest } from 'vitest';

import { internalServerError } from '@presentation/helpers/http';

import { ControllerErrorHandlerDecorator } from '@main/decorators/ControllerErrorHandler';

import { CreateErrorRepositorySpy } from '../../application/mocks';
import { makeErrorMock } from '../../domain';
import {
  ControllerSpy,
  makeControllerHttpRequestMock,
  makeControllerHttpResponseMock,
} from '../mocks';

let controllerSpy: ControllerSpy;
let createErrorRepositorySpy: CreateErrorRepositorySpy;

let controllerErrorHandlerDecorator: ControllerErrorHandlerDecorator;

describe('ControllerErrorHandlerDecorator', () => {
  beforeEach(() => {
    controllerSpy = new ControllerSpy();
    createErrorRepositorySpy = new CreateErrorRepositorySpy();

    controllerErrorHandlerDecorator = new ControllerErrorHandlerDecorator(
      controllerSpy,
      createErrorRepositorySpy
    );
  });

  it('should call Controller once with correct values', async () => {
    const handleSpy = vitest.spyOn(controllerSpy, 'handle');

    const request = makeControllerHttpRequestMock();

    await controllerErrorHandlerDecorator.handle(request);

    expect(handleSpy).toHaveBeenCalledTimes(1);
    expect(handleSpy).toHaveBeenCalledWith(request);
  });

  it('should call CreateErrorRepository once with correct values on error', async () => {
    const errorMock = makeErrorMock();

    vitest.spyOn(controllerSpy, 'handle').mockRejectedValueOnce(errorMock);

    const createSpy = vitest.spyOn(createErrorRepositorySpy, 'create');

    const request = makeControllerHttpRequestMock();

    await controllerErrorHandlerDecorator.handle(request);

    expect(createSpy).toHaveBeenCalledTimes(1);
    expect(createSpy).toHaveBeenCalledWith({
      stack: errorMock.stack,
      exception_was_thrown_in: controllerSpy.constructor.name,
      resource_url: request.original_url,
      http_method: request.method,
      user_id: request.user?.id,
    });
  });

  it('should call CreateErrorRepository with default stack if error not have a stack', async () => {
    const errorMock = makeErrorMock();

    errorMock.stack = undefined;

    vitest.spyOn(controllerSpy, 'handle').mockRejectedValueOnce(errorMock);

    const createSpy = vitest.spyOn(createErrorRepositorySpy, 'create');

    const request = makeControllerHttpRequestMock();

    await controllerErrorHandlerDecorator.handle(request);

    expect(createSpy).toHaveBeenCalledTimes(1);
    expect(createSpy).toHaveBeenCalledWith({
      stack: 'NO STACK PROVIDED',
      exception_was_thrown_in: controllerSpy.constructor.name,
      resource_url: request.original_url,
      http_method: request.method,
      user_id: request.user?.id,
    });
  });

  it('should return internal server error (500) if Controller throws', async () => {
    const errorMock = makeErrorMock();

    vitest.spyOn(controllerSpy, 'handle').mockRejectedValueOnce(errorMock);

    const request = makeControllerHttpRequestMock();

    const response = await controllerErrorHandlerDecorator.handle(request);

    expect(response).toEqual(internalServerError(errorMock));
  });

  it('should return same Controller response on success ', async () => {
    const responseMock = makeControllerHttpResponseMock();

    vitest.spyOn(controllerSpy, 'handle').mockResolvedValueOnce(responseMock);

    const request = makeControllerHttpRequestMock();

    const response = await controllerErrorHandlerDecorator.handle(request);

    expect(response).toEqual(responseMock);
  });
});
