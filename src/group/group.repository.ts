import { GroupModel } from "./group.model";

export class GroupRepository {
  static getById(kartoffelID: string) {
    return GroupModel.findOne({ kartoffelID }).exec();
  }

  static getChildrenByParentId(pId: string) {
    return GroupModel.findOne({ kartoffelID: pId }).populate("childrenPopulated").exec();
  }

  static updateById(id: string, amountChange: number) {
    return GroupModel.findOneAndUpdate(
      { kartoffelID: id },
      { $inc: { assignedCount: amountChange } },
      { new: true }
    ).exec();
  }

  static getUnitInfo(unitName: string) {
    return GroupModel.aggregate([
      { $match: { unitName } },
      {
        $group: {
          _id: "$unitName",
          groupsCount: { $sum: 1 },
          peopleSum: { $sum: "$peopleSum" },
          kevaSum: { $sum: "$serviceType.kevaSum" },
          hovaSumService: { $sum: "$serviceType.hovaSum" },
          miluimSumService: { $sum: "$serviceType.miluimSum" },
          civilianSumService: { $sum: "$serviceType.civilianSum" },
          aSum: { $sum: "$rankType.aSum" },
          bSum: { $sum: "$rankType.bSum" },
          cSum: { $sum: "$rankType.cSum" },
          hovaSumRank: { $sum: "$rankType.hovaSum" },
          miluimSumRank: { $sum: "$rankType.miluimSum" },
          civilianSumRank: { $sum: "$rankType.civilianSum" },
        },
      },
      {
        $project: {
          groupsCount: 1,
          peopleSum: 1,
          serviceType: {
            kevaSum: "$kevaSum",
            hovaSum: "$hovaSumService",
            miluimSum: "$miluimSumService",
            civilianSum: "$civilianSumService",
          },
          rankType: {
            aSum: "$aSum",
            bSum: "$bSum",
            cSum: "$cSum",
            hovaSum: "$hovaSumRank",
            miluimSum: "$miluimSumRank",
            civilianSum: "$civilianSumRank",
          },
        },
      },
    ]).exec();
  }
}
