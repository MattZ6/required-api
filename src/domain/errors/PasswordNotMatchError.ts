export class PasswordNotMatchError extends Error {
  constructor() {
    super();

    super.name = 'PasswordNotMatchError';
    super.message = 'The password does not match';
  }
}
