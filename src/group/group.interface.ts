export interface IGroup {
  name: string;
  kartoffelID: string;
  ancestors?: IGroup[] | string[];
  children?: IGroup[] | string[];
  isMador: boolean;
  unitName: string; // or enums unit
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
