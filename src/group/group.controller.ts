import { Request, Response } from "express";
import { GroupManager } from "./group.manager";
import { IGroup } from "./group.interface";
import { GroupNotFound, IdInvalidError } from "../utils/erros/userErrors";
import { Validations } from "../utils/validations/validations";
import config from "../config";

export class GroupController {
  static async getById(req: Request, res: Response) {
    const { id } = req.params;
    if (!Validations.isIdValid(id)) throw new IdInvalidError();

    const group: IGroup | null = await GroupManager.getById(id);
    if (!group) throw new GroupNotFound();

    res.json(group);
  }

  static async getByParentId(req: Request, res: Response) {
    const pId = req.params.id ? req.params.id : config.RootAncestorId;
    if (!Validations.isIdValid(pId)) throw new IdInvalidError();

    const group: IGroup | null = await GroupManager.getByParentId(pId);
    if (!group) throw new GroupNotFound();

    res.json(group);
  }

  // static async getManyById(req: Request, res: Response) {
  //   const { ids } = req.body;

  //   ids.forEach((id: string) =>
  //   { if(!Validations.isIdValid(id)) throw new IdInvalidError()});

  //   const group: [IGroup] | null = await GroupManager.GetManyByIds(ids);
  //   if (!group) {
  //     throw new GroupNotFound(); // TODO: group errors !
  //   }
  //   res.json(group);
  // }

  static async updateCounter(req: Request, res: Response) {
    const isCountGrow = req.body.isCountGrow;
    const { id } = req.params;

    if (!Validations.isIdValid(id)) throw new IdInvalidError();

    const updateResponse = await GroupManager.UpdateCounter(id, isCountGrow);
    res.json("hey");
  }
}
