import { faker } from '@faker-js/faker';

import {
  WrongPasswordError,
  UserNotFoundWithProvidedEmailError,
} from '@domain/errors';

import { AuthenticateUserUseCase } from '@application/usecases/user/AuthenticateUser';

import { makeErrorMock, makeUserMock } from '../../domain';
import {
  CompareHashProviderSpy,
  EncryptProviderSpy,
  FindUserByEmailRepositorySpy,
  makeAuthenticateUserUseCaseInputMock,
} from '../mocks';

let findUserByEmailRepositorySpy: FindUserByEmailRepositorySpy;
let compareHashProviderSpy: CompareHashProviderSpy;
let encryptProviderSpy: EncryptProviderSpy;

let authenticateUserUseCase: AuthenticateUserUseCase;

describe('AuthenticateUserUseCase', () => {
  beforeEach(() => {
    findUserByEmailRepositorySpy = new FindUserByEmailRepositorySpy();
    compareHashProviderSpy = new CompareHashProviderSpy();
    encryptProviderSpy = new EncryptProviderSpy();

    authenticateUserUseCase = new AuthenticateUserUseCase(
      findUserByEmailRepositorySpy,
      compareHashProviderSpy,
      encryptProviderSpy
    );
  });

  it('should call FindUserByEmailRepository once with correct values', async () => {
    const findByEmailSpy = jest.spyOn(
      findUserByEmailRepositorySpy,
      'findByEmail'
    );

    const input = makeAuthenticateUserUseCaseInputMock();

    await authenticateUserUseCase.execute(input);

    expect(findByEmailSpy).toHaveBeenCalledTimes(1);
    expect(findByEmailSpy).toHaveBeenCalledWith({
      email: input.email,
    });
  });

  it('should throw if FindUserByEmailRepository throws', async () => {
    const error = makeErrorMock();

    jest
      .spyOn(findUserByEmailRepositorySpy, 'findByEmail')
      .mockRejectedValueOnce(error);

    const input = makeAuthenticateUserUseCaseInputMock();

    const promise = authenticateUserUseCase.execute(input);

    await expect(promise).rejects.toThrowError(error);
  });

  it('should throw UserNotFoundWithProvidedEmailError if user not exist', async () => {
    jest
      .spyOn(findUserByEmailRepositorySpy, 'findByEmail')
      .mockResolvedValueOnce(undefined);

    const input = makeAuthenticateUserUseCaseInputMock();

    const promise = authenticateUserUseCase.execute(input);

    await expect(promise).rejects.toBeInstanceOf(
      UserNotFoundWithProvidedEmailError
    );
  });

  it('should call CompareHashProvider once with correct values', async () => {
    const userMock = makeUserMock();

    jest
      .spyOn(findUserByEmailRepositorySpy, 'findByEmail')
      .mockResolvedValueOnce(userMock);

    const compareSpy = jest.spyOn(compareHashProviderSpy, 'compare');

    const input = makeAuthenticateUserUseCaseInputMock();

    await authenticateUserUseCase.execute(input);

    expect(compareSpy).toHaveBeenCalledTimes(1);
    expect(compareSpy).toHaveBeenCalledWith({
      value: input.password,
      hashed_value: userMock.password_hash,
    });
  });

  it('should throw if CompareHashProvider throws', async () => {
    const error = makeErrorMock();

    jest.spyOn(compareHashProviderSpy, 'compare').mockRejectedValueOnce(error);

    const input = makeAuthenticateUserUseCaseInputMock();

    const promise = authenticateUserUseCase.execute(input);

    await expect(promise).rejects.toThrowError(error);
  });

  it('should throw WrongPasswordError if passwords not match', async () => {
    jest.spyOn(compareHashProviderSpy, 'compare').mockResolvedValueOnce(false);

    const input = makeAuthenticateUserUseCaseInputMock();

    const promise = authenticateUserUseCase.execute(input);

    await expect(promise).rejects.toBeInstanceOf(WrongPasswordError);
  });

  it('should call EncryptProvider once with correct values', async () => {
    const userMock = makeUserMock();

    jest
      .spyOn(findUserByEmailRepositorySpy, 'findByEmail')
      .mockResolvedValueOnce(userMock);

    const encryptSpy = jest.spyOn(encryptProviderSpy, 'encrypt');

    const input = makeAuthenticateUserUseCaseInputMock();

    await authenticateUserUseCase.execute(input);

    expect(encryptSpy).toHaveBeenCalledTimes(1);
    expect(encryptSpy).toHaveBeenCalledWith({
      value: userMock.id,
    });
  });

  it('should throw if EncryptProvider throws', async () => {
    const error = makeErrorMock();

    jest.spyOn(encryptProviderSpy, 'encrypt').mockRejectedValueOnce(error);

    const input = makeAuthenticateUserUseCaseInputMock();

    const promise = authenticateUserUseCase.execute(input);

    await expect(promise).rejects.toThrowError(error);
  });

  it('should return authentication data on success', async () => {
    const accessToken = faker.datatype.string();

    jest
      .spyOn(encryptProviderSpy, 'encrypt')
      .mockResolvedValueOnce(accessToken);

    const input = makeAuthenticateUserUseCaseInputMock();

    const output = await authenticateUserUseCase.execute(input);

    expect(output).toEqual({
      access_token: accessToken,
    });
  });
});
