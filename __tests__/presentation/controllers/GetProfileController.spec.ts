import { faker } from '@faker-js/faker';

import { UserNotFoundWithThisIdError } from '@domain/errors';
import { IUser } from '@domain/models/User';

import { GetProfileController } from '@presentation/controllers/profile/GetProfileController';
import { toProfileDTO } from '@presentation/controllers/profile/GetProfileController/types';
import { notFound, ok } from '@presentation/helpers/http/http';

import { GetProfileUseCaseSpy } from '../mocks';

let getProfileUseCaseSpy: GetProfileUseCaseSpy;

let getProfileController: GetProfileController;

describe('GetProfileController', () => {
  beforeEach(() => {
    getProfileUseCaseSpy = new GetProfileUseCaseSpy();

    getProfileController = new GetProfileController(getProfileUseCaseSpy);
  });

  it('should call GetProfileController with correct data', async () => {
    const executeSpy = jest.spyOn(getProfileUseCaseSpy, 'execute');

    const user_id = faker.datatype.uuid();

    await getProfileController.handle({ user_id });

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith({ user_id });
  });

  it('should throw if GetProfileController throws', async () => {
    jest
      .spyOn(getProfileUseCaseSpy, 'execute')
      .mockRejectedValueOnce(new Error());

    const promise = getProfileController.handle({
      user_id: faker.datatype.uuid(),
    });

    await expect(promise).rejects.toThrow();
  });

  it('should return 404 if CreateUserUseCase throws UserNotFoundWithThisIdError', async () => {
    const error = new UserNotFoundWithThisIdError();

    jest.spyOn(getProfileUseCaseSpy, 'execute').mockRejectedValueOnce(error);

    const response = await getProfileController.handle({
      user_id: faker.datatype.uuid(),
    });

    expect(response).toEqual(notFound(error));
  });

  it('should return 200 on success', async () => {
    const user: IUser = {
      id: faker.datatype.uuid(),
      name: faker.name.findName(),
      email: faker.internet.email(),
      password_hash: faker.internet.password(),
      created_at: faker.datatype.datetime(),
      updated_at: faker.datatype.datetime(),
    };

    jest
      .spyOn(getProfileUseCaseSpy, 'execute')
      .mockReturnValueOnce(Promise.resolve(user));

    const response = await getProfileController.handle({
      user_id: faker.datatype.uuid(),
    });

    expect(response).toEqual(ok(toProfileDTO(user)));
  });
});
