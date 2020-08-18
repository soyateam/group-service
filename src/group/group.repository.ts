import { GroupModel } from "./group.model";
import { group } from "console";

export class GroupRepository {
  static async getById(kartoffelID: string) {
    return GroupModel.findOne({ kartoffelID }).exec();
  }

  static getMany(ids: [string]) {
    return GroupModel.find({ kartoffelID: { $in: ids } }).exec();
  }

  static getChildrenByParentId(pId: string) {
    return GroupModel.findOne({ kartoffelID: pId }).populate("childrens").exec();
  }

  static updateById(id: string, amountChange: number) {
    return GroupModel.findOneAndUpdate(
      { kartoffelID: id },
      { $inc: { assignedCount: amountChange } },
      { new: true }
    ).exec();
  }
}
