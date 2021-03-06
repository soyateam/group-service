export interface IGroup {
  name: string;
  kartoffelID: string;
  ancestors: [string];
  children: [string];
  isMador: boolean;
  parent: string;
  unitName: string;
  peopleSum: number;
  serviceType: IServiceType;
  rankType: IRankType;
  assignedCount: number;
  childrenPopulated: [IGroup];
}

export interface IServiceType {
  kevaSum: number;
  hovaSum: number;
  civilianSum: number;
}

export interface IRankType {
  aSum: number;
  bSum: number;
  cSum: number;
  dSum: number;
  hovaSum: number;
  civilianSum: number;
}

export const collectionName = 'group';