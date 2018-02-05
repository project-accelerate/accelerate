import { CognitoIdentityServiceProvider } from "aws-sdk";
import env from "env-var";
import * as jwksRsa from "jwks-rsa";

/**
 * Get the production auth config from conventional environmental variables
 */
export function getAuthConfig() {
  const UserPoolId = env
    .get("COGNITO_USER_POOL_ID")
    .required()
    .asString();

  return {
    UserPoolId,
    get ClientId() {
      return env
        .get("COGNITO_CLIENT_ID")
        .required()
        .asString();
    },
    get ClientSecret() {
      return env
        .get("COGNITO_CLIENT_SECRET")
        .required()
        .asString();
    },
    get authService() {
      return new CognitoIdentityServiceProvider({});
    },
    get jwtSecret() {
      const jwksUri = env
        .get("COGNITO_JWT_KEY_URI")
        .required()
        .asString();

      return jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri
      });
    },
    jwtAudience: UserPoolId,
    get jwtIssuer() {
      return env
        .get("COGNITO_JWT_ISSUER")
        .required()
        .asString();
    },
    jwtAlgorithms: ["RS256"]
  };
}
