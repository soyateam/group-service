import { IUser } from './user.interface';

export interface IOrganization {
  id?: string;
  name: string;
  directMembers?: IUser[] | string[];
  createdAt: Date;
  updatedAt?: Date;
  ancestors?: string[];
  children?: IOrganization[] | string[];
  hierarchy?: string[];
  isALeaf?: boolean;
  isAlive?: boolean;
}
