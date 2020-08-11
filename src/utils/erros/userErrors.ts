import { UserError } from "./errorTypes";

export class IdInvalidError extends UserError {
  constructor(message = "Id is invalid") {
    super(message, 400);
  }
}

export class QueryParamInvalidError extends UserError {
  constructor(message = "Query param is invalid") {
    super(message, 400);
  }
}

export class GroupNotFound extends UserError {
  constructor(message = "Group not found") {
    super(message, 404);
  }
}

export class AuthenticationError extends UserError {
  constructor(message = "Authentication Error") {
    super(message, 401);
  }
}

export class NotPermittedError extends UserError {
  constructor(message = "Operation not permitted") {
    super(message, 403);
  }
}

export class NotFoundError extends UserError {
  constructor(message = "Resource not found") {
    super(message, 404);
  }
}
