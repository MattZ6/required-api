import { internalServerError } from '@presentation/helpers/http';

import { MiddlewareErrorHandlerDecorator } from '@main/decorators/MiddlewareErrorHandler';

import { CreateErrorRepositorySpy } from '../../application/mocks';
import { makeErrorMock } from '../../domain';
import {
  MiddlewareSpy,
  makeMiddlewareHttpRequestMock,
  makeMiddlewareHttpResponseMock,
} from '../mocks';

let middlewareSpy: MiddlewareSpy;
let createErrorRepositorySpy: CreateErrorRepositorySpy;

let middlewareErrorHandlerDecorator: MiddlewareErrorHandlerDecorator;

describe('MiddlewareErrorHandlerDecorator', () => {
  beforeEach(() => {
    middlewareSpy = new MiddlewareSpy();
    createErrorRepositorySpy = new CreateErrorRepositorySpy();

    middlewareErrorHandlerDecorator = new MiddlewareErrorHandlerDecorator(
      middlewareSpy,
      createErrorRepositorySpy
    );
  });

  it('should call Middleware once with correct values', async () => {
    const handleSpy = jest.spyOn(middlewareSpy, 'handle');

    const request = makeMiddlewareHttpRequestMock();

    await middlewareErrorHandlerDecorator.handle(request);

    expect(handleSpy).toHaveBeenCalledTimes(1);
    expect(handleSpy).toHaveBeenCalledWith(request);
  });

  it('should call CreateErrorRepository once with correct values on error', async () => {
    const errorMock = makeErrorMock();

    jest.spyOn(middlewareSpy, 'handle').mockRejectedValueOnce(errorMock);

    const createSpy = jest.spyOn(createErrorRepositorySpy, 'create');

    const request = makeMiddlewareHttpRequestMock();

    await middlewareErrorHandlerDecorator.handle(request);

    expect(createSpy).toHaveBeenCalledTimes(1);
    expect(createSpy).toHaveBeenCalledWith({
      stack: errorMock.stack,
      exception_was_thrown_in: middlewareSpy.constructor.name,
      resource_url: request.original_url,
      http_method: request.method,
      user_id: request.user?.id,
    });
  });

  it('should call CreateErrorRepository with default stack if error not have a stack', async () => {
    const errorMock = makeErrorMock();

    errorMock.stack = undefined;

    jest.spyOn(middlewareSpy, 'handle').mockRejectedValueOnce(errorMock);

    const createSpy = jest.spyOn(createErrorRepositorySpy, 'create');

    const request = makeMiddlewareHttpRequestMock();

    await middlewareErrorHandlerDecorator.handle(request);

    expect(createSpy).toHaveBeenCalledTimes(1);
    expect(createSpy).toHaveBeenCalledWith({
      stack: 'NO STACK PROVIDED',
      exception_was_thrown_in: middlewareSpy.constructor.name,
      resource_url: request.original_url,
      http_method: request.method,
      user_id: request.user?.id,
    });
  });

  it('should return internal server error (500) if Middleware throws', async () => {
    const errorMock = makeErrorMock();

    jest.spyOn(middlewareSpy, 'handle').mockRejectedValueOnce(errorMock);

    const request = makeMiddlewareHttpRequestMock();

    const response = await middlewareErrorHandlerDecorator.handle(request);

    expect(response).toEqual(internalServerError(errorMock));
  });

  it('should return same Middleware response on success ', async () => {
    const responseMock = makeMiddlewareHttpResponseMock();

    jest.spyOn(middlewareSpy, 'handle').mockResolvedValueOnce(responseMock);

    const request = makeMiddlewareHttpRequestMock();

    const response = await middlewareErrorHandlerDecorator.handle(request);

    expect(response).toEqual(responseMock);
  });
});
