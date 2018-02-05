/* eslint-env jest */
/* eslint-disable no-underscore-dangle */

import uuid from "uuid";
import MockExpressRequest from "mock-express-request";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import MockExpressResponse from "mock-express-response";
import { loginEndpoint } from "../loginEndpoint";

describe("loginEndpoint", () => {
  it("should return access token and user claims for valid credentials", async () => {
    const userClaims = { name: "me" };
    const accessToken = jwt.sign(userClaims, uuid());

    const authService = mockAuthService({
      tokenResponse: {
        AuthenticationResult: {
          AccessToken: accessToken,
          ExpiresIn: 10000
        }
      }
    });

    const middleware = loginEndpoint({
      UserPoolId: authService.poolId,
      ClientId: authService.clientId,
      authService,
      ClientSecret: uuid()
    });

    const req = new MockExpressRequest({
      body: {
        username: authService.username,
        password: authService.password
      }
    });
    const res = new MockExpressResponse();

    await middleware(req, res, err => {
      if (err) {
        throw err;
      }
    });

    const cookies = cookie.parse(res.get("Set-Cookie").join(";\n"));

    expect(cookies.access_token).toBe(accessToken);
    expect(JSON.parse(cookies.user)).toHaveProperty("name", "me");
    expect(res.statusCode).toBe(201);
  });

  it("should set new password when requested by auth challenge and password is provided", async () => {
    const userClaims = { name: "me" };
    const accessToken = jwt.sign(userClaims, uuid());

    const authService = mockAuthService({
      tokenResponse: {
        ChallengeName: "NEW_PASSWORD_REQUIRED",
        Session: "mySession"
      },
      challengeResponses: {
        NEW_PASSWORD_REQUIRED: {
          AuthenticationResult: {
            AccessToken: accessToken,
            ExpiresIn: 10000
          }
        }
      }
    });

    const middleware = loginEndpoint({
      UserPoolId: authService.poolId,
      ClientId: authService.clientId,
      authService,
      ClientSecret: uuid()
    });

    const req = new MockExpressRequest({
      body: {
        username: authService.username,
        password: authService.password,
        newPassword: "1234"
      }
    });
    const res = new MockExpressResponse();

    await middleware(req, res, err => {
      if (err) {
        throw err;
      }
    });

    const cookies = cookie.parse(res.get("Set-Cookie").join(";\n"));

    expect(cookies.access_token).toBe(accessToken);
    expect(JSON.parse(cookies.user)).toHaveProperty("name", "me");
    expect(res.statusCode).toBe(201);
  });

  it("should fail when new password requested by auth challenge and new password is not provided", async () => {
    const authService = mockAuthService({
      tokenResponse: {
        ChallengeName: "NEW_PASSWORD_REQUIRED",
        Session: "mySession"
      },
      challengeResponses: {
        NEW_PASSWORD_REQUIRED: {
          AuthenticationResult: {
            AccessToken: "myToken",
            ExpiresIn: 10000
          }
        }
      }
    });

    const middleware = loginEndpoint({
      UserPoolId: authService.poolId,
      ClientId: authService.clientId,
      authService,
      ClientSecret: uuid()
    });

    const req = new MockExpressRequest({
      body: {
        username: authService.username,
        password: authService.password
      }
    });
    const res = new MockExpressResponse();

    await middleware(req, res, err => {
      if (err) {
        throw err;
      }
    });

    expect(res.get("Set-Cookie")).toBeUndefined();
    expect(res.statusCode).toBe(401);
    expect(res._getJSON().reason).toBe("NEW_PASSWORD_REQUIRED");
  });

  it("should return 401 for invalid credentials", async () => {
    const authService = mockAuthService();

    const middleware = loginEndpoint({
      UserPoolId: authService.poolId,
      ClientId: authService.clientId,
      authService,
      ClientSecret: uuid()
    });

    const req = new MockExpressRequest({
      body: {
        username: authService.username,
        password: "wrong"
      }
    });
    const res = new MockExpressResponse();

    await middleware(req, res, err => {
      if (err) {
        throw err;
      }
    });

    expect(res.get("Set-Cookie")).toBeUndefined();
    expect(res.statusCode).toBe(401);
    expect(res._getJSON().reason).toBe("INVALID_CREDENTIALS");
  });
});

function mockAuthService({
  username = "myUser",
  password = "myPassword",
  clientId = "myClient",
  poolId = "myPool",
  tokenResponse,
  challengeResponses = {}
} = {}) {
  return {
    username,
    password,
    clientId,
    poolId,
    adminInitiateAuth(params) {
      return {
        async promise() {
          if (
            params.AuthFlow !== "ADMIN_NO_SRP_AUTH" ||
            params.AuthParameters.PASSWORD !== password ||
            !validateParams(params, "AuthParameters")
          ) {
            return reject("NotAuthorizedException");
          }

          return tokenResponse;
        }
      };
    },
    adminRespondToAuthChallenge(params) {
      return {
        async promise() {
          if (
            params.Session !== tokenResponse.Session ||
            !params.ChallengeResponses.NEW_PASSWORD ||
            !validateParams(params, "ChallengeResponses")
          ) {
            return reject("NotAuthorizedException");
          }

          return challengeResponses[params.ChallengeName];
        }
      };
    }
  };

  function reject(name) {
    const error = Error();
    error.name = name;

    return Promise.reject(error);
  }

  function validateParams(params, field) {
    return Boolean(
      params.UserPoolId === poolId &&
        params.ClientId === clientId &&
        params[field].USERNAME === username &&
        params[field].SECRET_HASH
    );
  }
}
