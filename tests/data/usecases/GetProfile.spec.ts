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

    const user_id = 'any-id';

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
      user_id: 'any-id',
    });

    await expect(promise).rejects.toThrow();
  });

  it('should be able to get user data', async () => {
    const user: IUserModel = {
      id: 'any-id',
      name: 'John Doe',
      email: 'john.doe@email.com',
      password_hash: 'passwordhash',
      created_at: new Date(),
      updated_at: new Date(),
    };

    jest
      .spyOn(findUserByIdRepositorySpy, 'findById')
      .mockReturnValueOnce(Promise.resolve(user));

    const profile = await getProfileUseCase.execute({
      user_id: 'any-id',
    });

    expect(profile).toBe(user);
  });
});
