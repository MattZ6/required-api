import { IUserModel } from '@domain/models/User';

import { IFindUserByIdRepository } from '@data/protocols/repositories/user';

import { GetProfileUseCase } from './GetProfile';

class FindUserByIdRepositoryStub implements IFindUserByIdRepository {
  async findById(id: string): Promise<IUserModel> {
    return {
      id,
      name: 'John Doe',
      email: 'john.doe@email.com',
      password_hash: 'passwordhash',
      created_at: new Date(),
      updated_at: new Date(),
    };
  }
}

let findUserByIdRepository: FindUserByIdRepositoryStub;

let getProfileUseCase: GetProfileUseCase;

describe('GetProfileUseCase', () => {
  beforeEach(() => {
    findUserByIdRepository = new FindUserByIdRepositoryStub();

    getProfileUseCase = new GetProfileUseCase(findUserByIdRepository);
  });

  it('should call FindUserByIdRepository with correct data', async () => {
    const findByIdSpy = jest.spyOn(findUserByIdRepository, 'findById');

    const user_id = 'any-id';

    await getProfileUseCase.execute({
      user_id,
    });

    expect(findByIdSpy).toHaveBeenCalledWith(user_id);
  });

  it('should throw if FindUserByIdRepository throws', async () => {
    jest
      .spyOn(findUserByIdRepository, 'findById')
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
      .spyOn(findUserByIdRepository, 'findById')
      .mockReturnValueOnce(Promise.resolve(user));

    const profile = await getProfileUseCase.execute({
      user_id: 'any-id',
    });

    expect(profile).toBe(user);
  });
});
