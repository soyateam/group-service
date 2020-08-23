import config from "../../config";
import { Types } from "mongoose";
import { sign } from "jsonwebtoken";
// import { PermissionType } from "../permissions/user.interface";

export function ValidTokenMock() {
  const user = {
    id: new Types.ObjectId(),
    personId: new Types.ObjectId(),
  };

  return `Bearer ${sign(user, config.authentication.key)}`;
}
