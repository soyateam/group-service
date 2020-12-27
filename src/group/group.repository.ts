import { GroupModel } from "./group.model";
import config from '../config';


export class GroupRepository {
  static getById(kartoffelID: string, dateFilter: string = config.CURRENT_DATE_VALUE) {
    return GroupModel.findOne({ kartoffelID, date: dateFilter }).exec();
  }

  static getChildrenByParentId(pId: string, dateFilter: string = config.CURRENT_DATE_VALUE) {
    return GroupModel.findOne({ kartoffelID: pId, date: dateFilter }).populate({ path: 'childrenPopulated', match: { date: dateFilter } }).exec();
  }

  static updateById(id: string, amountChange: number) {
    return GroupModel.findOneAndUpdate(
      { kartoffelID: id, date: config.CURRENT_DATE_VALUE },
      { $inc: { assignedCount: amountChange } },
      { new: true }
    ).exec();
  }

  static getUnitInfo(unitName: string, dateFilter: string = config.CURRENT_DATE_VALUE) {
    return GroupModel.aggregate([
      { $match: { unitName, date: dateFilter } },
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
          date: dateFilter,
        },
      },
    ]).exec();
  }
}
