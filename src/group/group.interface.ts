export interface IGroup {
  name: string;
  kartoffelID: string;
  ancestors: IGroup[] | string[]; // NOTE: or to do not required
  children: IGroup[] | string[]; // NOTE: or to do not required
  isMador: boolean;
  unitName: string; // NOTE: or enums unit
  peopleSum: number;
  serviceType: IServiceType;
  rankType: IRankType;
  assignedCount: number;
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
