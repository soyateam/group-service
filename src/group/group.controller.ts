import config from "../config";
import { Request, Response } from "express";
import { GroupManager } from "./group.manager";
import { IGroup } from "./group.interface";
import { GroupNotFound, IdInvalidError, UnitNotFound } from "../utils/erros/userErrors";
import { Validations } from "../utils/validations/validations";
import { ServerError } from "../utils/erros/errorTypes";
import { IResponseUnitSums, IResponseGetByMany } from "../response/response.interface";

const groupNotFoundMsg = "Group not found";

export class GroupController {
  /**
   * Gets group by id
   * @param req - Express Request with param of group id
   * @param res - Express Response
   */
  static async getById(req: Request, res: Response) {
    const { id } = req.params;

    const group: IGroup | null = await GroupManager.getById(id);
    if (!group) throw new GroupNotFound(`${groupNotFoundMsg}, id: ${id}`);

    res.json(group);
  }

  /**
   * Get groups by array of ids
   * @param req - Express Request with body of groups ids array
   * @param res - Express Response
   */
  static async getManyByIds(req: Request, res: Response) {
    const { ids } = req.body;

    const groups: IResponseGetByMany = await GroupManager.getManyByIds(ids);
    if (!groups) throw new ServerError("can`t find groups");

    res.json(groups);
  }

  /**
   * Gets children by the parent id
   * @param req - Express Request with param of parent id or null (and the we set the parent id to be the root ancestor id)
   * @param res - Express Response
   */
  static async getChildrenByParentId(req: Request, res: Response) {
    const pId = req.params.id ? req.params.id : config.RootAncestorId;
    if (!Validations.isIdValid(pId)) throw new IdInvalidError();

    const group: IGroup | null = await GroupManager.getByParentId(pId);
    if (!group) throw new GroupNotFound(`${groupNotFoundMsg}, id: ${pId}`);

    res.json(group.childrenGroup);
  }

  /**
   * Assign/Unassigned task for group (unassigned decrease the counter and assigned increase the counter by one)
   * @param req - Express Request with group id param and boolean isCountGrow (true for increasing, false for decreasing)
   * @param res - Express Response
   */
  static async updateCounter(req: Request, res: Response) {
    const { id } = req.params;
    const { isCountGrow } = req.body;

    const updateGroup: IGroup | null = await GroupManager.updateCounter(id, isCountGrow);
    if (!updateGroup) throw new GroupNotFound(`${groupNotFoundMsg}, id: ${id}`);

    res.json(updateGroup);
  }

  /**
   * Get units info sums by units names
   * @param req - Express Request with body of units names array
   * @param res - Express Response
   */
  static async getUnitsSums(req: Request, res: Response) {
    const { unitsNames } = req.body;

    const unitInfo: IResponseUnitSums = await GroupManager.getUnitsInfo(unitsNames);
    if (!unitInfo) throw new ServerError("can`t find units");

    res.json(unitInfo);
  }
}
