import { Types } from 'mongoose';

export class Validations {
  static isIdValid(id: string): boolean {
    return !!id && Types.ObjectId.isValid(id);
  }
}
