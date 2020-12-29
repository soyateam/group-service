import { GroupModel } from "./group.model";
import DateDumpModel from '../utils/dateDumpModel';
import config from '../config';
import { collectionName } from "./group.interface";


export class GroupRepository {

  static getModelByDate(dateFilter: string) {
    return DateDumpModel.getModelByDate(GroupModel, dateFilter);
  }

  static getById(kartoffelID: string, dateFilter?: string) {
    if (dateFilter) {
      return GroupRepository.getModelByDate(dateFilter).findOne({ kartoffelID }).exec();
    }

    return GroupModel.findOne({ kartoffelID }).exec();
  }

  static getChildrenByParentId(pId: string, dateFilter?: string) {
    if (dateFilter) {
      return GroupRepository.getModelByDate(dateFilter).findOne({ kartoffelID: pId }).populate('childrenPopulated').exec();
    }
    
    return GroupModel.findOne({ kartoffelID: pId }).populate('childrenPopulated').exec();
  }

  static updateById(id: string, amountChange: number) {
    return GroupModel.findOneAndUpdate(
      { kartoffelID: id },
      { $inc: { assignedCount: amountChange } },
      { new: true }
    ).exec();
  }

  static getUnitInfo(unitName: string, dateFilter?: string) {

    if (dateFilter) {
      return GroupRepository.getModelByDate(dateFilter).aggregate([
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

  /**
   * Get all date filters for groups.
   */
  static async getDateFilters() {
    return await DateDumpModel.getAllDates(`${collectionName.toLowerCase()}s`);
  }
}
