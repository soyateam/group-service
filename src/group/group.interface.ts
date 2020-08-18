export interface IGroup {
  name: string;
  kartoffelID: string;
  ancestors: [string];
  children: [string];
  isMador: boolean;
  parent: string;
  unitName: string; // NOTE: or enums unit
  peopleSum: number;
  serviceType: IServiceType;
  rankType: IRankType;
  assignedCount: number;
  childrens: [IGroup];
}

export interface IServiceType {
  kevaSum: number;
  hovaSum: number;
}

export interface IRankType {
  aSum: number;
  bSum: number;
  cSum: number;
}
