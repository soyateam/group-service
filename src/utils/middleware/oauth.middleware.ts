import { Response, Request, NextFunction } from "express";
import { AuthenticationError, NotPermittedError } from "../erros/userErrors";
import { ServerError } from "../erros/errorTypes";
import fs from "fs";
import { default as jwt } from "jsonwebtoken";

export class OAuthMiddleware {
  static checkValidation = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const isService: any = req.headers["Auth-Type"];
    if (isService != "Service") next();

    const { Authorization }: any = req.headers;

    // Check if no authorization header sent
    if (!Authorization || Authorization.length < 2)
      throw new AuthenticationError("You must send an Authorization header");

    const [authType, token] = Authorization.trim().split(" ");

    // The header value missing the correct prefix
    if (authType !== "Bearer")
      throw new AuthenticationError("Expected a Bearer token");

    // If the token is empty
    if (token.length == 0) throw new AuthenticationError("No token");

    // TODO: fetch new public key when the server is bootstraping?
    const ospikePublicKey = fs.readFileSync("./publickey.pem");
    if (!ospikePublicKey) throw new ServerError("cannot get spike public key");

    const jwtResponse: any = jwt.verify(token, ospikePublicKey);

    if (!jwtResponse.active) throw new AuthenticationError("invalid token");
    if (!jwtResponse.scope) next();

    jwtResponse.scope.forEach((itemScope: any) => {
      // if (itemScope === requiredScope) next();
    });

    throw new NotPermittedError(
      "The service is not allowed for this operation"
    );
  };
}
