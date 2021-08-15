export class UserAlreadyExistsWithThisEmailError extends Error {
  constructor() {
    super();

    super.name = 'UserAlreadyExistsWithThisEmailError';
    super.message = 'There is already a registered user with this email';
  }
}
