import Faker from 'faker';

import { UserNotFoundWithThisIdError } from '@domain/errors';
import { IUserModel } from '@domain/models/User';

import { GetProfileUseCase } from '@data/usecases/get-profile/GetProfile';

import { FindUserByIdRepositorySpy } from '../mocks';

let findUserByIdRepositorySpy: FindUserByIdRepositorySpy;

let getProfileUseCase: GetProfileUseCase;

describe('GetProfileUseCase', () => {
  beforeEach(() => {
    findUserByIdRepositorySpy = new FindUserByIdRepositorySpy();

    getProfileUseCase = new GetProfileUseCase(findUserByIdRepositorySpy);
  });

  it('should call FindUserByIdRepository with correct data', async () => {
    const findByIdSpy = jest.spyOn(findUserByIdRepositorySpy, 'findById');

    const user_id = Faker.datatype.uuid();

    await getProfileUseCase.execute({
      user_id,
    });

    expect(findByIdSpy).toHaveBeenCalledWith(user_id);
  });

  it('should throw if FindUserByIdRepository throws', async () => {
    jest
      .spyOn(findUserByIdRepositorySpy, 'findById')
      .mockRejectedValueOnce(new Error());

    const promise = getProfileUseCase.execute({
      user_id: Faker.datatype.uuid(),
    });

    await expect(promise).rejects.toThrow();
  });

  it('should not be able to get profile of a non-existing user', async () => {
    jest
      .spyOn(findUserByIdRepositorySpy, 'findById')
      .mockReturnValueOnce(Promise.resolve(undefined));

    const promise = getProfileUseCase.execute({
      user_id: Faker.datatype.uuid(),
    });

    await expect(promise).rejects.toBeInstanceOf(UserNotFoundWithThisIdError);
  });

  it('should be able to get user data', async () => {
    const user: IUserModel = {
      id: Faker.datatype.uuid(),
      name: Faker.name.findName(),
      email: Faker.internet.email(),
      password_hash: Faker.internet.password(),
      created_at: Faker.datatype.datetime(),
      updated_at: Faker.datatype.datetime(),
    };

    jest
      .spyOn(findUserByIdRepositorySpy, 'findById')
      .mockReturnValueOnce(Promise.resolve(user));

    const profile = await getProfileUseCase.execute({
      user_id: Faker.datatype.uuid(),
    });

    expect(profile).toBe(user);
  });
});
