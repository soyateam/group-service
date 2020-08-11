import { Request, Response } from "express";
import { GroupManager } from "./group.manager";
import { IOrganization } from "../kartoffel/organization.interface";

export class GroupController {
  static getOrgByID = async (req: Request, res: Response) => {
    let orgID = req.params.id ? req.params.id : "";

    const org: IOrganization = await GroupManager.getOrganizationById(orgID);

    res.json(org);
  };
}
