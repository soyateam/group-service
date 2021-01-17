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

  static getSumOfMainGroup(unitFilter?: string, dateFilter?: string) {

    let aggregation: any = [
      {
        $group: {
          _id: '',
          peopleSum: { $sum: '$peopleSum' },
        },
      },
      {
        $project: {
          _id: 0,
          peopleSum: 1,
        },
      },
    ];

    if (unitFilter) {
      aggregation = [
        { 
          $match: {
            $or: [
              { ancestors: unitFilter },
              { kartoffelID: unitFilter },
            ],
          },
        },
        {
          $group: {
            _id: '',
            peopleSum: { $sum: '$peopleSum' },
          },
        },
        {
          $project: {
            _id: 0,
            peopleSum: 1,
          },
        },
      ];
    }

    if (dateFilter) {
      return GroupRepository.getModelByDate(dateFilter).aggregate(aggregation).exec();
    }

    return GroupModel.aggregate(aggregation).exec();
  }

  static getChildrenByParentId(pId: string, dateFilter?: string) {
    if (dateFilter) {
      return GroupRepository.getModelByDate(dateFilter).findOne({ kartoffelID: pId }).populate('childrenPopulated').exec();
    }
    
    return GroupModel.findOne({ kartoffelID: pId }).populate('childrenPopulated').exec();
  }

  static getAllChildrenByParentId(pId: string, dateFilter?: string) {
    if (dateFilter) {
      return GroupRepository.getModelByDate(dateFilter).find({ ancestors: { $all: [pId] }});
    }
    
    return GroupModel.find({ ancestors: { $all: [pId] }});
  }

  static updateByManyIds(groups: string[], amountChange: number) {
    return GroupModel.updateMany(
      { kartoffelID: { $in : groups } },
      { $inc: { assignedCount: amountChange } }
    ).exec();
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
            civilianSumService: { $sum: "$serviceType.civilianSum" },
            aSum: { $sum: "$rankType.aSum" },
            bSum: { $sum: "$rankType.bSum" },
            cSum: { $sum: "$rankType.cSum" },
            dSum: { $sum: "$rankType.dSum" },
            hovaSumRank: { $sum: "$rankType.hovaSum" },            
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
              civilianSum: "$civilianSumService",
            },
            rankType: {
              aSum: "$aSum",
              bSum: "$bSum",
              cSum: "$cSum",
              dSum: "$dSum",
              hovaSum: "$hovaSumRank",
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
          civilianSumService: { $sum: "$serviceType.civilianSum" },
          aSum: { $sum: "$rankType.aSum" },
          bSum: { $sum: "$rankType.bSum" },
          cSum: { $sum: "$rankType.cSum" },
          dSum: { $sum: "$rankType.dSum" },
          hovaSumRank: { $sum: "$rankType.hovaSum" },          
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
            civilianSum: "$civilianSumService",
          },
          rankType: {
            aSum: "$aSum",
            bSum: "$bSum",
            cSum: "$cSum",
            dSum: "$dSum",
            hovaSum: "$hovaSumRank",
            civilianSum: "$civilianSumRank",
          },
        },
      },
    ]).exec();
  }

  /**
   * Get all units names and ids.
   * @param dateFilter - Date filter for groups.
   */
  static async getUnitsNames(dateFilter?: string) {
    return this.getChildrenByParentId(config.RootAncestorId, dateFilter);
  }

  /**
   * Get all date filters for groups.
   */
  static async getDateFilters() {
    return await DateDumpModel.getAllDates(`${collectionName.toLowerCase()}s`);
  }
}
