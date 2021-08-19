export class UserNotFoundWithThisEmailError extends Error {
  constructor() {
    super();

    super.name = 'UserNotFoundWithThisEmailError';
    super.message = 'Theres no user registered user with this email';
  }
}
