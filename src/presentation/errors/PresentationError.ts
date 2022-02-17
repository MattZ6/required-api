export class PresentationError extends Error {
  constructor(message: string) {
    super(message);

    super.name = this.constructor.name;
  }
}
