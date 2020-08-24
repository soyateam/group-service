import { GroupRepository } from "./group.repository";
import { IResponseGetByMany, IResponseUnitSums, IUnit } from "../response/response.interface";
import { IGroup } from "./group.interface";

export class GroupManager {
  static getById(id: string) {
    return GroupRepository.getById(id);
  }

  static getByParentId(pId: string) {
    return GroupRepository.getChildrenByParentId(pId);
  }

  static async getManyByIds(ids: [string]) {
    let response: IResponseGetByMany = { groups: [], notFound: [] };
    await Promise.all(
      ids.map(async (id) => {
        const group: IGroup | null = await GroupRepository.getById(id);
        group ? response.groups.push(group) : response.notFound.push(id);
      })
    );

    return response;
  }

  static async getUnitsInfo(unitNames: [string]) {
    let response: IResponseUnitSums = { units: [], notFound: [] };
    await Promise.all(
      unitNames.map(async (unitName) => {
        const unit: IUnit[] = await GroupRepository.getUnitInfo(unitName);
        unit.length > 0 ? response.units.push(unit[0]) : response.notFound.push(unitName);
      })
    );

    return response;
  }

  static async updateCounter(id: string, isInc: boolean) {
    const amountUpdate = isInc ? 1 : -1;
    return GroupRepository.updateById(id, amountUpdate);
  }
}
