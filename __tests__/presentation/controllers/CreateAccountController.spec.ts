import { faker } from '@faker-js/faker';

import { UserAlreadyExistsWithProvidedEmailError } from '@domain/errors';

import { CreateAccountController } from '@presentation/controllers/authentication/CreateAccountController';
import { unprocessableEntity, created } from '@presentation/helpers/http/http';

import { CreateUserUseCaseSpy } from '../mocks';

let createUserUseCaseSpy: CreateUserUseCaseSpy;

let createAccountController: CreateAccountController;

describe('CreateAccountController', () => {
  beforeEach(() => {
    createUserUseCaseSpy = new CreateUserUseCaseSpy();

    createAccountController = new CreateAccountController(createUserUseCaseSpy);
  });

  it('should call CreateUserUseCase with correct data', async () => {
    const executeSpy = jest.spyOn(createUserUseCaseSpy, 'execute');

    const name = faker.name.findName();
    const email = faker.internet.email();
    const password = faker.internet.password();

    await createAccountController.handle({
      body: {
        name,
        email,
        password,
      },
    });

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith({
      name,
      email,
      password,
    });
  });

  it('should throw if CreateUserUseCase throws', async () => {
    jest
      .spyOn(createUserUseCaseSpy, 'execute')
      .mockRejectedValueOnce(new Error());

    const promise = createAccountController.handle({
      body: {
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      },
    });

    await expect(promise).rejects.toThrow();
  });

  it('should return 422 if CreateUserUseCase throws UserAlreadyExistsWithThisEmailError', async () => {
    const error = new UserAlreadyExistsWithProvidedEmailError();

    jest.spyOn(createUserUseCaseSpy, 'execute').mockRejectedValueOnce(error);

    const response = await createAccountController.handle({
      body: {
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      },
    });

    expect(response).toEqual(unprocessableEntity(error));
  });

  it('should return 201 on success', async () => {
    const response = await createAccountController.handle({
      body: {
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      },
    });

    expect(response).toEqual(created());
  });
});
