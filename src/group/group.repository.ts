import { GroupModel } from "./group.model";

export class GroupRepository {
  //   static create(group: IGroup) {
  //     return GroupModel.create(group);
  //   }

  static getById(id: string) {
    return GroupModel.findById(id).exec();
  }

  static getChildrenByParentId(pId: string) {
    return GroupModel.findById(pId).populate("children").exec();
  }

  static getMany(ids: [string]) {
    return GroupModel.find().where("_id").in(ids).exec();
  }

  static updateById(id: string, amountChange: number) {
    return GroupModel.findByIdAndUpdate(
      { kartoffelID: id },
      { $inc: { amountChange } }
    );
  }
}
