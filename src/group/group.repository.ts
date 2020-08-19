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

  static getUnitInfo(unitName: string) {
    // const groupQuery = `"unitName": "$unitName"`;
    // const groupQuery = unitName: "$unitName", peopleSum: { $sum: "$peopleSum" } };
    return GroupModel.aggregate([
      { $match: { unitName } },
      {
        $group: {
          _id: "$unitName",
          groupsCount: { $sum: 1 },
          peopleSum: { $sum: "$peopleSum" },
          serviceType: {
            $addToSet: { kevaSum: { $sum: "$serviceType.kevaSum" }, hovaSum: { $sum: "$serviceType.hovaSum" } },
          },
          rankType: {
            $addToSet: {
              aSum: { $sum: "$rankType.aSum" },
              bSum: { $sum: "$rankType.bSum" },
              cSum: { $sum: "$rankType.cSum" },
            },
          },
        },
      },
    ]).exec();
  }
}
