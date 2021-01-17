import config from '../config';
import { Request, Response } from 'express';
import { GroupManager } from './group.manager';
import { IGroup } from './group.interface';
import { GroupNotFound, IdInvalidError, InvalidBodyError } from '../utils/erros/userErrors';
import { Validations } from '../utils/validations/validations';
import { IResponseUnitSums, IResponseGetByMany } from '../response/response.interface';

export class GroupController {
  /**
   * Gets group by id
   * @param req - Express Request with param of group id
   * @param res - Express Response, returns the group
   */
  static async getById(req: Request, res: Response) {
    const { id } = req.params;
    const dateFilter = req.query.date as string;

    const group: IGroup | null = await GroupManager.getById(id, dateFilter);
    if (!group) throw new GroupNotFound(id);

    res.json(group);
  }

  /**
   * Get groups by array of ids
   * @param req - Express Request with body of groups ids array
   * @param res - Express Response, returns IResponseGetByMany (arrays of group and array of not found groups)
   */
  static async getManyByIds(req: Request, res: Response) {
    const { ids } = req.body;
    const dateFilter = req.query.date as string;

    const groups: IResponseGetByMany = await GroupManager.getManyByIds(ids, dateFilter);

    res.json(groups);
  }

  /**
   * Get sum of main groups (by filter of main group to sum with)
   * @param req - Express Request with query param which indicates which main group to calculate on (which unit)
   * @param res - Express Response,  returns object with sum property containing the sum.
   */
  static async getSumOfMainGroups(req: Request, res: Response) {
    const unitFilter = req.query.unit as string;
    const dateFilter = req.query.date as string;

    const result = await GroupManager.getSumOfMainGroup(unitFilter, dateFilter);

    return res.status(200).send({ sum: result[0].peopleSum });
  }

  /**
   * Gets children by the parent id
   * @param req - Express Request with param of parent id or null (and the we set the parent id to be the root ancestor id)
   * @param res - Express Response,  returns array of group
   */
  static async getChildrenByParentId(req: Request, res: Response) {
    const pId = req.params.id ? req.params.id : config.RootAncestorId;
    const dateFilter = req.query.date as string;
    console.log(dateFilter);

    if (!Validations.isIdValid(pId)) throw new IdInvalidError(pId);

    const group: IGroup | null = await GroupManager.getByParentId(pId, dateFilter);
    if (!group) throw new GroupNotFound(pId);

    res.json(group.childrenPopulated);
  }

  /**
   * Gets all children by the parent id
   * @param req - Express Request with param of parent id or null (and the we set the parent id to be the root ancestor id)
   * @param res - Express Response,  returns array of group
   */
  static async getAllChildrenByParentId(req: Request, res: Response) {
    const pId = req.params.id ? req.params.id : config.RootAncestorId;
    const dateFilter = req.query.date as string;
    console.log(dateFilter);

    if (!Validations.isIdValid(pId)) throw new IdInvalidError(pId);

    const group = await GroupManager.getAllByParentId(pId, dateFilter);
    if (!group) throw new GroupNotFound(pId);

    res.json(group);
  }

  /**
   * Assign/Unassigned task for multiple groups (unassigned decrease the counter and assigned increase the counter by one)
   * @param req - Express Request with body contains group ids and boolean isCountGrow (true for increasing, false for decreasing)
   * @param res - Express Response, returns the updated group
   */
  static async updateMultipleCounter(req: Request, res: Response) {
    const ids = req.body.ids;
    const isCountGrow = req.body.isCountGrow;
    
    if (ids && typeof isCountGrow === 'boolean') {
      await GroupManager.updateMultipleCounter(ids, isCountGrow);

      return res.status(200).send();
    }

    throw new InvalidBodyError(`${!ids ? 'ids, ': ''}${typeof isCountGrow !== 'boolean' ? 'isCountGrow': ''}`);
  }

  /**
   * Assign/Unassigned task for group (unassigned decrease the counter and assigned increase the counter by one)
   * @param req - Express Request with group id param and boolean isCountGrow (true for increasing, false for decreasing)
   * @param res - Express Response, returns the updated group
   */
  static async updateCounter(req: Request, res: Response) {
    const { id } = req.params;
    const { isCountGrow } = req.body;

    const updateGroup: IGroup | null = await GroupManager.updateCounter(id, isCountGrow);
    if (!updateGroup) throw new GroupNotFound(id);

    res.json(updateGroup);
  }

  /**
   * Get units info sums by units names
   * @param req - Express Request with body of units names array
   * @param res - Express Response, returns IResponseUnitSums (arrays of units and array notFound unit names)
   */
  static async getUnitsSums(req: Request, res: Response) {
    const { unitsNames } = req.body;
    const dateFilter = req.query.date as string;

    const unitInfo: IResponseUnitSums = await GroupManager.getUnitsInfo(unitsNames, dateFilter);

    res.json(unitInfo);
  }

  /**
   * Get unit names from group hierarchy tree.
   * @param req - Express Request with body of units names array
   * @param res - Express Response, returns array containing object with the unit names and corresponding id
   */
  static async getUnitsNames(req: Request, res: Response) {
    const dateFilter = req.query.date as string;

    const unitNames = await GroupManager.getUnitsNames(dateFilter) as any;

    return res.status(200).send(unitNames.childrenPopulated);
  }

  /**
   * Get date filters for groups.
   * @param req - Express Request with body of units names array
   * @param res - Express Response, returns array containing the dates (YYYY-MM)
   */
  static async getDateFilters(req: Request, res: Response) {
    return res.status(200).send(await GroupManager.getDateFilters());
  }
}
