import faker from '@faker-js/faker';

import {
  UserTokenNotFoundWithProvidedTokenError,
  UserTokenExpiredError,
} from '@domain/errors';

import { RefreshUserAccessTokenUseCase } from '@application/usecases/user/RefreshUserAccessToken';

import { makeUserTokenMock, makeErrorMock } from '../../../domain';
import {
  FindUserTokenByTokenRepositorySpy,
  EncryptProviderSpy,
  GenerateUuidProviderSpy,
  CreateUserTokenRepositorySpy,
  DeleteUserTokenByIdRepositorySpy,
  makeRefreshTokenExpiresTimeInMillissecondsMock,
  makeRefreshUserAccessTokenUseCaseInputMock,
  makeGenerateUuidProviderOutputMock,
  makeEncryptProviderOutputMock,
} from '../../mocks';

let findUserTokenByTokenRepositorySpy: FindUserTokenByTokenRepositorySpy;
let encryptProviderSpy: EncryptProviderSpy;
let generateUuidProviderSpy: GenerateUuidProviderSpy;
let refreshTokenExpiresTimeInMillissecondsMock: number;
let createUserTokenRepositorySpy: CreateUserTokenRepositorySpy;
let deleteUserTokenByIdRepositorySpy: DeleteUserTokenByIdRepositorySpy;

let refreshUserAccessTokenUseCase: RefreshUserAccessTokenUseCase;

function setValidTokenTimeMock() {
  const userTokenMock = makeUserTokenMock();

  jest
    .spyOn(findUserTokenByTokenRepositorySpy, 'findByToken')
    .mockResolvedValueOnce(userTokenMock);

  jest
    .spyOn(Date, 'now')
    .mockReturnValueOnce(userTokenMock.expires_in.getTime());

  return { userTokenMock };
}

describe('RefreshUserAccessTokenUseCase', () => {
  beforeEach(() => {
    findUserTokenByTokenRepositorySpy = new FindUserTokenByTokenRepositorySpy();
    encryptProviderSpy = new EncryptProviderSpy();
    generateUuidProviderSpy = new GenerateUuidProviderSpy();
    refreshTokenExpiresTimeInMillissecondsMock =
      makeRefreshTokenExpiresTimeInMillissecondsMock();
    createUserTokenRepositorySpy = new CreateUserTokenRepositorySpy();
    deleteUserTokenByIdRepositorySpy = new DeleteUserTokenByIdRepositorySpy();

    refreshUserAccessTokenUseCase = new RefreshUserAccessTokenUseCase(
      findUserTokenByTokenRepositorySpy,
      encryptProviderSpy,
      generateUuidProviderSpy,
      refreshTokenExpiresTimeInMillissecondsMock,
      createUserTokenRepositorySpy,
      deleteUserTokenByIdRepositorySpy
    );
  });

  it('should call FindUserTokenByTokenRepository once with correct values', async () => {
    const findByTokenSpy = jest.spyOn(
      findUserTokenByTokenRepositorySpy,
      'findByToken'
    );

    const input = makeRefreshUserAccessTokenUseCaseInputMock();

    await refreshUserAccessTokenUseCase.execute(input);

    expect(findByTokenSpy).toHaveBeenCalledTimes(1);
    expect(findByTokenSpy).toHaveBeenCalledWith({ token: input.refresh_token });
  });

  it('should throw if FindUserTokenByTokenRepository throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(findUserTokenByTokenRepositorySpy, 'findByToken')
      .mockRejectedValueOnce(errorMock);

    const input = makeRefreshUserAccessTokenUseCaseInputMock();

    const promise = refreshUserAccessTokenUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should throw UserTokenNotFoundWithProvidedTokenError if token does not exist', async () => {
    jest
      .spyOn(findUserTokenByTokenRepositorySpy, 'findByToken')
      .mockResolvedValueOnce(undefined);

    const input = makeRefreshUserAccessTokenUseCaseInputMock();

    const response = refreshUserAccessTokenUseCase.execute(input);

    await expect(response).rejects.toBeInstanceOf(
      UserTokenNotFoundWithProvidedTokenError
    );
  });

  it('should throw UserTokenExpiredError if token has expired', async () => {
    const userTokenMock = makeUserTokenMock();

    jest
      .spyOn(findUserTokenByTokenRepositorySpy, 'findByToken')
      .mockResolvedValueOnce(userTokenMock);

    jest
      .spyOn(Date, 'now')
      .mockReturnValueOnce(userTokenMock.expires_in.getTime() + 1);

    const input = makeRefreshUserAccessTokenUseCaseInputMock();

    const promise = refreshUserAccessTokenUseCase.execute(input);

    await expect(promise).rejects.toBeInstanceOf(UserTokenExpiredError);
  });

  it('should call EncryptProvider once with correct values', async () => {
    const { userTokenMock } = setValidTokenTimeMock();

    const encryptSpy = jest.spyOn(encryptProviderSpy, 'encrypt');

    const input = makeRefreshUserAccessTokenUseCaseInputMock();

    await refreshUserAccessTokenUseCase.execute(input);

    expect(encryptSpy).toHaveBeenCalledTimes(1);
    expect(encryptSpy).toHaveBeenCalledWith({
      subject: userTokenMock.user_id,
    });
  });

  it('should throw if EncryptProvider throws', async () => {
    setValidTokenTimeMock();

    const errorMock = makeErrorMock();

    jest.spyOn(encryptProviderSpy, 'encrypt').mockRejectedValueOnce(errorMock);

    const input = makeRefreshUserAccessTokenUseCaseInputMock();

    const promise = refreshUserAccessTokenUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should call GenerateUuidProvider once', async () => {
    setValidTokenTimeMock();

    const generateSpy = jest.spyOn(generateUuidProviderSpy, 'generate');

    const input = makeRefreshUserAccessTokenUseCaseInputMock();

    await refreshUserAccessTokenUseCase.execute(input);

    expect(generateSpy).toHaveBeenCalledTimes(1);
  });

  it('should throw if GenerateUuidProvider throws', async () => {
    setValidTokenTimeMock();

    const errorMock = makeErrorMock();

    jest
      .spyOn(generateUuidProviderSpy, 'generate')
      .mockRejectedValueOnce(errorMock);

    const input = makeRefreshUserAccessTokenUseCaseInputMock();

    const promise = refreshUserAccessTokenUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should call CreateUserTokenRepository once with correct values', async () => {
    const { userTokenMock } = setValidTokenTimeMock();

    const now = faker.datatype.datetime();

    jest.spyOn(Date, 'now').mockReturnValueOnce(now.getTime());

    const token = makeGenerateUuidProviderOutputMock();

    jest
      .spyOn(generateUuidProviderSpy, 'generate')
      .mockResolvedValueOnce(token);

    const createSpy = jest.spyOn(createUserTokenRepositorySpy, 'create');

    const input = makeRefreshUserAccessTokenUseCaseInputMock();

    await refreshUserAccessTokenUseCase.execute(input);

    const expiresIn = new Date(
      now.getTime() + refreshTokenExpiresTimeInMillissecondsMock
    );

    expect(createSpy).toHaveBeenCalledTimes(1);
    expect(createSpy).toHaveBeenCalledWith({
      token,
      user_id: userTokenMock.user_id,
      expires_in: expiresIn,
    });
  });

  it('should throw if CreateUserTokenRepository throws', async () => {
    setValidTokenTimeMock();

    const errorMock = makeErrorMock();

    jest
      .spyOn(createUserTokenRepositorySpy, 'create')
      .mockRejectedValueOnce(errorMock);

    const input = makeRefreshUserAccessTokenUseCaseInputMock();

    const promise = refreshUserAccessTokenUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should call DeleteUserTokenByIdRepositorySpy once with correct values', async () => {
    const { userTokenMock } = setValidTokenTimeMock();

    const deleteByIdSpy = jest.spyOn(
      deleteUserTokenByIdRepositorySpy,
      'deleteById'
    );

    const input = makeRefreshUserAccessTokenUseCaseInputMock();

    await refreshUserAccessTokenUseCase.execute(input);

    expect(deleteByIdSpy).toHaveBeenCalledTimes(1);
    expect(deleteByIdSpy).toHaveBeenCalledWith({ id: userTokenMock.id });
  });

  it('should throw if DeleteUserTokenByIdRepositorySpy throws', async () => {
    setValidTokenTimeMock();

    const errorMock = makeErrorMock();

    jest
      .spyOn(deleteUserTokenByIdRepositorySpy, 'deleteById')
      .mockRejectedValueOnce(errorMock);

    const input = makeRefreshUserAccessTokenUseCaseInputMock();

    const promise = refreshUserAccessTokenUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return Authentication on success', async () => {
    setValidTokenTimeMock();

    const userTokenMock = makeUserTokenMock();

    jest
      .spyOn(createUserTokenRepositorySpy, 'create')
      .mockResolvedValueOnce(userTokenMock);

    const accessToken = makeEncryptProviderOutputMock();
    const refreshToken = makeGenerateUuidProviderOutputMock();

    jest
      .spyOn(encryptProviderSpy, 'encrypt')
      .mockResolvedValueOnce(accessToken);
    jest
      .spyOn(generateUuidProviderSpy, 'generate')
      .mockResolvedValueOnce(refreshToken);

    const input = makeRefreshUserAccessTokenUseCaseInputMock();

    const response = await refreshUserAccessTokenUseCase.execute(input);

    expect(response).toEqual({
      access_token: accessToken,
      refresh_token: refreshToken,
    });
  });
});
