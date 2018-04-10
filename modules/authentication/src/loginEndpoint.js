import crypto from "crypto";
import * as jwt from "jsonwebtoken";
import { getAuthConfig } from "./getAuthConfig";

/**
 * Endpoint to authenticate a user.
 */
export function loginEndpoint(
  { UserPoolId, ClientId, authService, ClientSecret } = getAuthConfig()
) {
  return async (req, res, next) => {
    const { username, password, newPassword } = req.body;

    try {
      let awsResponse = await authService
        .adminInitiateAuth({
          UserPoolId,
          ClientId,
          AuthFlow: "ADMIN_NO_SRP_AUTH",
          AuthParameters: {
            USERNAME: username,
            PASSWORD: password,
            SECRET_HASH: hashClientSecret({
              username,
              clientId: ClientId,
              clientSecret: ClientSecret
            }),
            DEVICE_KEY: req.body.deviceKey
          }
        })
        .promise();

      if (awsResponse.ChallengeName) {
        if (awsResponse.ChallengeName === "NEW_PASSWORD_REQUIRED") {
          if (!newPassword) {
            return res.status(401).send({
              reason: "NEW_PASSWORD_REQUIRED"
            });
          }

          awsResponse = await authService
            .adminRespondToAuthChallenge({
              UserPoolId,
              ClientId,
              ChallengeName: awsResponse.ChallengeName,
              ChallengeResponses: {
                USERNAME: username,
                NEW_PASSWORD: newPassword,
                SECRET_HASH: hashClientSecret({
                  username,
                  clientId: ClientId,
                  clientSecret: ClientSecret
                })
              },
              Session: awsResponse.Session
            })
            .promise();
        }
      }

      if (!awsResponse.AuthenticationResult) {
        throw new Error(`Unexpected AWS response: ${awsResponse}`);
      }

      const { AccessToken, ExpiresIn } = awsResponse.AuthenticationResult;
      const userClaims = jwt.decode(AccessToken);

      res.cookie("access_token", AccessToken, {
        maxAge: ExpiresIn * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production"
      });

      res.cookie("user", JSON.stringify(userClaims), {
        maxAge: ExpiresIn * 1000
      });

      return res.sendStatus(201);
    } catch (error) {
      if (error.name === "NotAuthorizedException") {
        return res.status(401).send({ reason: "INVALID_CREDENTIALS" });
      }

      return next(error);
    }
  };
}

function hashClientSecret({ username, clientId, clientSecret }) {
  const hmac = crypto.createHmac("sha256", clientSecret);
  hmac.update(username);
  hmac.update(clientId);
  return hmac.digest("base64");
}
