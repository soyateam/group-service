import { Router } from "express";
import { BaseRequest } from "../utils/baseRequest";
import { GroupController } from "./group.controller";
import { Validations } from "../utils/validations/validations";

const GroupRouter: Router = Router();

GroupRouter.get(`/children/:id?`, BaseRequest.wrapAsync(GroupController.getByParentId));
GroupRouter.get(`/:id`, Validations.isIdParamValid, BaseRequest.wrapAsync(GroupController.getById));

GroupRouter.post(`/unit`, Validations.isUnitBodyValid, BaseRequest.wrapAsync(GroupController.getUnitSums));
GroupRouter.post(`/`, Validations.isIdsBodyValid, BaseRequest.wrapAsync(GroupController.getManyById));

GroupRouter.put(
  `/:id`,
  Validations.isIdParamValid,
  Validations.IsTaskGrowValid,
  BaseRequest.wrapAsync(GroupController.updateCounter)
);

export { GroupRouter };
