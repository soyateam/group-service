import { GroupRepository } from "./group.repository";

export class GroupManager {
  // static create(group: IGroup) {
  //   return GroupRepository.create(group);
  // }

  static getById(id: string) {
    return GroupRepository.getById(id);
  }

  static getByParentId(pId: string) {
    return GroupRepository.getChildrenByParentId(pId);
  }

  static async GetManyByIds(ids: [string]) {
    return GroupRepository.getMany(ids);
  }

  static async UpdateCounter(id: string, isInc: boolean) {
    const amountUpdate = isInc ? 1 : -1;
    return GroupRepository.updateById(id, amountUpdate);
  }
}
