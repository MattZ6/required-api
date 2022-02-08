import { faker } from '@faker-js/faker';

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

    const user_id = faker.datatype.uuid();

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
      user_id: faker.datatype.uuid(),
    });

    await expect(promise).rejects.toThrow();
  });

  it('should not be able to get profile of a non-existing user', async () => {
    jest
      .spyOn(findUserByIdRepositorySpy, 'findById')
      .mockReturnValueOnce(Promise.resolve(undefined));

    const promise = getProfileUseCase.execute({
      user_id: faker.datatype.uuid(),
    });

    await expect(promise).rejects.toBeInstanceOf(UserNotFoundWithThisIdError);
  });

  it('should be able to get user data', async () => {
    const user: IUserModel = {
      id: faker.datatype.uuid(),
      name: faker.name.findName(),
      email: faker.internet.email(),
      password_hash: faker.internet.password(),
      created_at: faker.datatype.datetime(),
      updated_at: faker.datatype.datetime(),
    };

    jest
      .spyOn(findUserByIdRepositorySpy, 'findById')
      .mockReturnValueOnce(Promise.resolve(user));

    const profile = await getProfileUseCase.execute({
      user_id: faker.datatype.uuid(),
    });

    expect(profile).toBe(user);
  });
});
