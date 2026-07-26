/**
 * ScalePad error hierarchy. The base error carries the HTTP status code and
 * the raw response body; every subclass pins its status.
 */
export class ScalePadError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public response: unknown
  ) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class AuthenticationError extends ScalePadError {
  constructor(message: string, response: unknown) {
    super(message, 401, response);
  }
}

/**
 * ScalePad returns 402 PAYMENT_REQUIRED when the API key's account has no
 * active subscription for the product an endpoint belongs to.
 */
export class PaymentRequiredError extends ScalePadError {
  constructor(message: string, response: unknown) {
    super(message, 402, response);
  }
}

export class ForbiddenError extends ScalePadError {
  constructor(message: string, response: unknown) {
    super(message, 403, response);
  }
}

export class NotFoundError extends ScalePadError {
  constructor(message: string, response: unknown) {
    super(message, 404, response);
  }
}

export class ValidationError extends ScalePadError {
  constructor(
    message: string,
    public errors: Array<{ field: string; message: string }>,
    response: unknown
  ) {
    super(message, 400, response);
  }
}

export class RateLimitError extends ScalePadError {
  constructor(
    message: string,
    public retryAfter: number,
    response: unknown
  ) {
    super(message, 429, response);
  }
}

export class ServerError extends ScalePadError {
  constructor(message: string, response: unknown) {
    super(message, 500, response);
  }
}
