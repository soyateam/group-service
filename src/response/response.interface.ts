import { IGroup, IServiceType, IRankType } from '../group/group.interface';

export interface IResponseGetByMany {
  groups: IGroup[];
  notFound: string[];
}

export interface IUnit {
  id: string; // unitName
  groupsCount: number;
  peopleSum: IServiceType;
  serviceType: IServiceType;
  rankType: IRankType;
}

export interface IResponseUnitSums {
  units: IUnit[];
  notFound: string[];
}
