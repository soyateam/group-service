import { Request, Response } from 'express';
import { HierarchyManager } from './hierarchy.manager';
import { IOrganization } from '../kartoffel/organization.interface';

export class HierarchyController {
  static getOrgByID = async (req: Request, res: Response) => {
    let orgID = req.params.id ? req.params.id : '';

    const org: IOrganization = await HierarchyManager.getOrganizationById(orgID);

    res.json(org);
  };
}
