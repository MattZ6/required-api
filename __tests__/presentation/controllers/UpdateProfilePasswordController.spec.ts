import { faker } from '@faker-js/faker';

import {
  WrongPasswordError,
  UserNotFoundWithProvidedIdError,
} from '@domain/errors';

import { UpdateProfilePasswordController } from '@presentation/controllers/profile/UpdateProfilePasswordController';
import {
  noContent,
  notFound,
  unprocessableEntity,
} from '@presentation/helpers/http/http';

import { UpdateUserPasswordUseCaseSpy } from '../mocks';

let updateUserPasswordUseCaseSpy: UpdateUserPasswordUseCaseSpy;

let updateProfilePasswordController: UpdateProfilePasswordController;

describe('UpdateProfilePasswordController', () => {
  beforeEach(() => {
    updateUserPasswordUseCaseSpy = new UpdateUserPasswordUseCaseSpy();

    updateProfilePasswordController = new UpdateProfilePasswordController(
      updateUserPasswordUseCaseSpy
    );
  });

  it('should call UpdateProfilePasswordController with correct data', async () => {
    const executeSpy = jest.spyOn(updateUserPasswordUseCaseSpy, 'execute');

    const user_id = faker.datatype.uuid();
    const old_password = faker.internet.password();
    const new_password = faker.internet.password();

    await updateProfilePasswordController.handle({
      user_id,
      body: { old_password, password: new_password },
    });

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith({
      user_id,
      old_password,
      new_password,
    });
  });

  it('should throw if UpdateProfilePasswordController throws', async () => {
    jest
      .spyOn(updateUserPasswordUseCaseSpy, 'execute')
      .mockRejectedValueOnce(new Error());

    const promise = updateProfilePasswordController.handle({
      user_id: faker.datatype.uuid(),
      body: {
        old_password: faker.internet.password(),
        password: faker.internet.password(),
      },
    });

    await expect(promise).rejects.toThrow();
  });

  it('should return 404 if UpdateUserPasswordUseCase throws UserNotFoundWithThisIdError', async () => {
    const error = new UserNotFoundWithProvidedIdError();

    jest
      .spyOn(updateUserPasswordUseCaseSpy, 'execute')
      .mockRejectedValueOnce(error);

    const response = await updateProfilePasswordController.handle({
      user_id: faker.datatype.uuid(),
      body: {
        old_password: faker.internet.password(),
        password: faker.internet.password(),
      },
    });

    expect(response).toEqual(notFound(error));
  });

  it('should return 422 if UpdateUserPasswordUseCase throws PasswordNotMatchError', async () => {
    const error = new WrongPasswordError();

    jest
      .spyOn(updateUserPasswordUseCaseSpy, 'execute')
      .mockRejectedValueOnce(error);

    const response = await updateProfilePasswordController.handle({
      user_id: faker.datatype.uuid(),
      body: {
        old_password: faker.internet.password(),
        password: faker.internet.password(),
      },
    });

    expect(response).toEqual(unprocessableEntity(error));
  });

  it('should return 204 on success', async () => {
    const response = await updateProfilePasswordController.handle({
      user_id: faker.datatype.uuid(),
      body: {
        old_password: faker.internet.password(),
        password: faker.internet.password(),
      },
    });

    expect(response).toEqual(noContent());
  });
});
