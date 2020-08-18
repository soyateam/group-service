import { Types } from "mongoose";
import { Request, Response, NextFunction } from "express";
import { IdInvalidError, QueryParamInvalidError } from "../erros/userErrors";

export class Validations {
  static IsTaskGrowValid(req: Request, res: Response, next: NextFunction) {
    const { isCountGrow } = req.body;
    if (isCountGrow == undefined || typeof isCountGrow != "boolean")
      next(new QueryParamInvalidError("enter a valid count grow"));
    next();
  }

  static isIdValid(id: string): boolean {
    return !!id && Types.ObjectId.isValid(id);
  }

  static isIdParamValid(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    if (Validations.isIdValid(id)) {
      next();
    } else {
      next(new IdInvalidError());
    }
  }

  static isIdsBodyValid(req: Request, res: Response, next: NextFunction) {
    const { ids } = req.body;
    if (!ids) next(new QueryParamInvalidError("please enter ids array"));

    ids.forEach((id: string) => {
      if (!Validations.isIdValid(id)) next(new IdInvalidError("there is invalid id"));
    });

    next();
  }
}
