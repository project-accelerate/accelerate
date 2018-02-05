import jwt from "express-jwt";
import { compose } from "compose-middleware";
import { getAuthConfig } from "./getAuthConfig";

/**
 * Extract a access token, adding a user object to the request if
 * the token is valid
 */
export function withUser(
  { jwtSecret, jwtAudience, jwtIssuer, jwtAlgorithms } = getAuthConfig()
) {
  const fromAccessTokenCookie = req => req.cookies.access_token;

  return compose(
    jwt({
      getToken: fromAccessTokenCookie,
      credentialsRequired: false,
      secret: jwtSecret,
      audience: jwtAudience,
      issuer: jwtIssuer,
      algorithms: jwtAlgorithms
    }),
    (err, req, res, next) => {
      if (err.name === "UnauthorizedError") {
        return next();
      }

      return next(err);
    }
  );
}
