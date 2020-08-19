import { GroupRepository } from "./group.repository";

export class GroupManager {
  static getById(id: string) {
    return GroupRepository.getById(id);
  }

  static getByParentId(pId: string) {
    return GroupRepository.getChildrenByParentId(pId);
  }

  static async getManyByIds(ids: [string]) {
    return GroupRepository.getMany(ids);
  }

  static async getUnitInfo(unitNames: [string]) {
    return GroupRepository.getUnitInfo(unitNames);
  }

  static async updateCounter(id: string, isInc: boolean) {
    const amountUpdate = isInc ? 1 : -1;
    return GroupRepository.updateById(id, amountUpdate);
  }
}
