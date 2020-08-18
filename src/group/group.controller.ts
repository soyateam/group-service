import { Request, Response } from "express";
import { GroupManager } from "./group.manager";
import { IGroup } from "./group.interface";
import { GroupNotFound, IdInvalidError, QueryParamInvalidError } from "../utils/erros/userErrors";
import { Validations } from "../utils/validations/validations";
import config from "../config";
import { ServerError } from "../utils/erros/errorTypes";

export class GroupController {
  static async getById(req: Request, res: Response) {
    const { id } = req.params;

    const group: IGroup | null = await GroupManager.getById(id);
    if (!group) throw new GroupNotFound();

    res.json(group);
  }

  static async getByParentId(req: Request, res: Response) {
    const pId = req.params.id ? req.params.id : config.RootAncestorId;
    if (!Validations.isIdValid(pId)) throw new IdInvalidError();

    const group: IGroup | null = await GroupManager.getByParentId(pId);
    if (!group) throw new ServerError("can`t found groups");

    res.json(group.childrens);
  }

  static async getManyById(req: Request, res: Response) {
    const { ids } = req.body;

    const groups: IGroup[] | [] = await GroupManager.GetManyByIds(ids);
    if (!groups) throw new ServerError("cant found groups");

    res.json(groups);
  }

  static async updateCounter(req: Request, res: Response) {
    const { id } = req.params;
    const { isCountGrow } = req.body;

    const updateGroup: IGroup | null = await GroupManager.UpdateCounter(id, isCountGrow);
    if (!updateGroup) throw new ServerError("cant found update group");

    res.json(updateGroup);
  }
}
