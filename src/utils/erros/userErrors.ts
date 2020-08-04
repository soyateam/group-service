import { UserError } from './errorTypes';

export class IdInvalidError extends UserError {
  constructor(message?: string) {
    super(message || 'Id is invalid', 400);
  }
}

export class QueryParamInvalidError extends UserError {
  constructor(message?: string) {
    super(message || 'Query param is invalid', 400);
  }
}

export class OrganizationNotFound extends UserError {
  constructor(message?: string) {
    super(message || 'Organization not found', 404);
  }
}

export class AuthenticationError extends UserError {
  constructor(message?: string) {
    super(message || 'Authentication Error', 401);
  }
}

export class NotPermittedError extends UserError {
  constructor(message?: string) {
    super(message || 'Operation not permitted', 403);
  }
}

export class NotFoundError extends UserError {
  constructor(message?: string) {
    super(message || 'Resource not found', 404);
  }
}