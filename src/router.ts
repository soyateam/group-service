import { Router } from 'express';
import config from './config';
import {HierarchyRouter} from './hierarchy/hierarchy.router';

const appRouter: Router = Router();

appRouter.get('/isalive', (req, res, next) => {
  res.send('alive');
});
appRouter.use(`${config.apiPrefix}/hierarchy`, HierarchyRouter);


export default appRouter;