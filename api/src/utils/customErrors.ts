export class ValidationError extends Error {
  public validationErrors: { message: string[] };

  constructor(errors: { message: string[] }) {
    super("Validation failed");
    this.validationErrors = errors;
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

export class SystemError extends Error {
  public code: string;

  constructor(code: string) {
    super(code);
    this.name = "SystemError";
    this.code = code;

    Object.setPrototypeOf(this, SystemError.prototype);
  }

  toJSON() {
    return { code: this.code };
  }
}
