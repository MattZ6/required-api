export class ValidationError extends Error {
  public field: string;
  public type: string;

  constructor(field: string, type: string, message: string) {
    super(message);

    super.name = this.constructor.name;
    this.field = field;
    this.type = type;
  }
}
