import { GroupModel } from "./group.model";

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

  static getUnitInfo(unitNames: [string]) {
    return GroupModel.aggregate([
      { $match: { unitName: { $in: unitNames } } },
      {
        $group: {
          _id: "$unitName",
          groupsCount: { $sum: 1 },
          peopleSum: { $sum: "$peopleSum" },
          kevaSum: { $sum: "$serviceType.kevaSum" },
          hovaSum: { $sum: "$serviceType.hovaSum" },
          aSum: { $sum: "$rankType.aSum" },
          bSum: { $sum: "$rankType.bSum" },
          cSum: { $sum: "$rankType.cSum" },
        },
      },
      {
        $project: {
          groupsCount: 1,
          peopleSum: 1,
          serviceType: { kevaSum: "$kevaSum", hovaSum: "$hovaSum" },
          rankType: { aSum: "$aSum", bSum: "$bSum", cSum: "$cSum" },
        },
      },
    ]).exec();
  }
}
