import Faker from 'faker';

import { UserNotFoundWithThisIdError } from '@domain/errors';
import { IUserModel } from '@domain/models/User';

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

    const user_id = Faker.datatype.uuid();

    await getProfileController.handle({ user_id });

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith({ user_id });
  });

  it('should throw if GetProfileController throws', async () => {
    jest
      .spyOn(getProfileUseCaseSpy, 'execute')
      .mockRejectedValueOnce(new Error());

    const promise = getProfileController.handle({
      user_id: Faker.datatype.uuid(),
    });

    await expect(promise).rejects.toThrow();
  });

  it('should return 404 if CreateUserUseCase throws UserNotFoundWithThisIdError', async () => {
    const error = new UserNotFoundWithThisIdError();

    jest.spyOn(getProfileUseCaseSpy, 'execute').mockRejectedValueOnce(error);

    const response = await getProfileController.handle({
      user_id: Faker.datatype.uuid(),
    });

    expect(response).toEqual(notFound(error));
  });

  it('should return 200 on success', async () => {
    const user: IUserModel = {
      id: Faker.datatype.uuid(),
      name: Faker.name.findName(),
      email: Faker.internet.email(),
      password_hash: Faker.internet.password(),
      created_at: Faker.datatype.datetime(),
      updated_at: Faker.datatype.datetime(),
    };

    jest
      .spyOn(getProfileUseCaseSpy, 'execute')
      .mockReturnValueOnce(Promise.resolve(user));

    const response = await getProfileController.handle({
      user_id: Faker.datatype.uuid(),
    });

    expect(response).toEqual(ok(toProfileDTO(user)));
  });
});
