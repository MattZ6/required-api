import { faker } from '@faker-js/faker';

import { UserNotFoundWithThisIdError } from '@domain/errors';

import { UpdateProfileNameController } from '@presentation/controllers/profile/UpdateProfileNameController';
import { noContent, notFound } from '@presentation/helpers/http/http';

import { UpdateUserNameUseCaseSpy } from '../mocks';

let updateUserNameUseCaseSpy: UpdateUserNameUseCaseSpy;

let updateProfileNameController: UpdateProfileNameController;

describe('UpdateProfileNameController', () => {
  beforeEach(() => {
    updateUserNameUseCaseSpy = new UpdateUserNameUseCaseSpy();

    updateProfileNameController = new UpdateProfileNameController(
      updateUserNameUseCaseSpy
    );
  });

  it('should call UpdateProfileNameController with correct data', async () => {
    const executeSpy = jest.spyOn(updateUserNameUseCaseSpy, 'execute');

    const user_id = faker.datatype.uuid();
    const name = faker.name.findName();

    await updateProfileNameController.handle({ user_id, body: { name } });

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith({ user_id, name });
  });

  it('should throw if UpdateProfileNameController throws', async () => {
    jest
      .spyOn(updateUserNameUseCaseSpy, 'execute')
      .mockRejectedValueOnce(new Error());

    const promise = updateProfileNameController.handle({
      user_id: faker.datatype.uuid(),
      body: { name: faker.name.findName() },
    });

    await expect(promise).rejects.toThrow();
  });

  it('should return 404 if UpdateUserNameUseCase throws UserNotFoundWithThisIdError', async () => {
    const error = new UserNotFoundWithThisIdError();

    jest
      .spyOn(updateUserNameUseCaseSpy, 'execute')
      .mockRejectedValueOnce(error);

    const response = await updateProfileNameController.handle({
      user_id: faker.datatype.uuid(),
      body: {
        name: faker.name.findName(),
      },
    });

    expect(response).toEqual(notFound(error));
  });

  it('should return 204 on success', async () => {
    const response = await updateProfileNameController.handle({
      user_id: faker.datatype.uuid(),
      body: {
        name: faker.name.findName(),
      },
    });

    expect(response).toEqual(noContent());
  });
});
