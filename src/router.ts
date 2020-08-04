import { Router } from 'express';

const appRouter: Router = Router();

appRouter.get('/isalive', (req, res, next) => {
  res.send('alive');
});

export default appRouter;