export class UserNotFoundWithThisIdError extends Error {
  constructor() {
    super();

    super.name = 'UserNotFoundWithThisIdError';
    super.message = 'Theres no user registered user with this id';
  }
}
