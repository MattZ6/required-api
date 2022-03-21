import { ValidationError } from './ValidationError';

export class MinLengthFieldError extends ValidationError {
  constructor(fieldName: string, minLength: number) {
    const message = `The ${fieldName} must have at least ${minLength} characters`;

    super(fieldName, 'minlength', message);
    super.message = message;
    super.field = fieldName;
  }
}
