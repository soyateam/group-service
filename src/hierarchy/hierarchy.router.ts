import { Router } from 'express';
import { BaseRequest } from '../utils/baseRequest';
import { HierarchyController } from './hierarchy.controller';

const HierarchyRouter: Router = Router();

HierarchyRouter.get('/org/:id?*', BaseRequest.wrapAsync(HierarchyController.getOrgByID));

export { HierarchyRouter };
