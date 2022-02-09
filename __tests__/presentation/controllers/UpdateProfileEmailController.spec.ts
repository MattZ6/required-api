import { faker } from '@faker-js/faker';

import {
  UserAlreadyExistsWithProvidedEmailError,
  UserNotFoundWithThisIdError,
} from '@domain/errors';

import { UpdateProfileEmailController } from '@presentation/controllers/profile/UpdateProfileEmailController';
import { conflict, noContent, notFound } from '@presentation/helpers/http/http';

import { UpdateUserEmailUseCaseSpy } from '../mocks';

let updateUserEmailUseCaseSpy: UpdateUserEmailUseCaseSpy;

let updateProfileEmailController: UpdateProfileEmailController;

describe('UpdateProfileEmailController', () => {
  beforeEach(() => {
    updateUserEmailUseCaseSpy = new UpdateUserEmailUseCaseSpy();

    updateProfileEmailController = new UpdateProfileEmailController(
      updateUserEmailUseCaseSpy
    );
  });

  it('should call UpdateProfileEmailController with correct data', async () => {
    const executeSpy = jest.spyOn(updateUserEmailUseCaseSpy, 'execute');

    const user_id = faker.datatype.uuid();
    const email = faker.internet.email();

    await updateProfileEmailController.handle({ user_id, body: { email } });

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith({ user_id, email });
  });

  it('should throw if UpdateProfileEmailController throws', async () => {
    jest
      .spyOn(updateUserEmailUseCaseSpy, 'execute')
      .mockRejectedValueOnce(new Error());

    const promise = updateProfileEmailController.handle({
      user_id: faker.datatype.uuid(),
      body: { email: faker.internet.email() },
    });

    await expect(promise).rejects.toThrow();
  });

  it('should return 404 if UpdateUserEmailUseCase throws UserNotFoundWithThisIdError', async () => {
    const error = new UserNotFoundWithThisIdError();

    jest
      .spyOn(updateUserEmailUseCaseSpy, 'execute')
      .mockRejectedValueOnce(error);

    const response = await updateProfileEmailController.handle({
      user_id: faker.datatype.uuid(),
      body: {
        email: faker.internet.email(),
      },
    });

    expect(response).toEqual(notFound(error));
  });

  it('should return 409 if UpdateUserEmailUseCase throws UserAlreadyExistsWithThisEmailError', async () => {
    const error = new UserAlreadyExistsWithProvidedEmailError();

    jest
      .spyOn(updateUserEmailUseCaseSpy, 'execute')
      .mockRejectedValueOnce(error);

    const response = await updateProfileEmailController.handle({
      user_id: faker.datatype.uuid(),
      body: {
        email: faker.internet.email(),
      },
    });

    expect(response).toEqual(conflict(error));
  });

  it('should return 204 on success', async () => {
    const response = await updateProfileEmailController.handle({
      user_id: faker.datatype.uuid(),
      body: {
        email: faker.internet.email(),
      },
    });

    expect(response).toEqual(noContent());
  });
});
