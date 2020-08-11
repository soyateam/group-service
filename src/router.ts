import { Router } from "express";
import config from "./config";
import { GroupRouter } from "./group/group.router";

const appRouter: Router = Router();

appRouter.get("/isalive", (req, res, next) => {
  res.send("alive");
});
appRouter.use(`${config.apiPrefix}/group`, GroupRouter);

export default appRouter;
