import { Router } from "express";
import { BaseRequest } from "../utils/baseRequest";
import { GroupController } from "./group.controller";

const GroupRouter: Router = Router();

GroupRouter.get(
  "/org/:id?*",
  BaseRequest.wrapAsync(GroupController.getOrgByID)
);

export { GroupRouter };
