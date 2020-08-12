import { Router } from "express";
import { BaseRequest } from "../utils/baseRequest";
import { GroupController } from "./group.controller";

const GroupRouter: Router = Router();
const groupPath = "/group";

GroupRouter.get(
  `${groupPath}/:id`,
  BaseRequest.wrapAsync(GroupController.getById)
);

GroupRouter.get(
  `${groupPath}/parent/:id?*`,
  BaseRequest.wrapAsync(GroupController.getByParentId)
);

export { GroupRouter };
