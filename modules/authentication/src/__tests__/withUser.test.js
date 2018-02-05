/* eslint-env jest */

import jwt from "jsonwebtoken";
import uuid from "uuid";
import MockExpressRequest from "mock-express-request";
import MockExpressResponse from "mock-express-response";
import { withUser } from "../withUser";

describe("withUser()", () => {
  const jwtKey = uuid();
  const otherKey = uuid();

  const user = { name: "me" };
  const opts = { audience: "myAudience", expiresIn: "1d", issuer: "myIssuer" };

  it("should extract user from valid token", done => {
    const idToken = jwt.sign(user, jwtKey, opts);
    const req = new MockExpressRequest({
      cookies: { access_token: idToken }
    });
    const res = new MockExpressResponse();

    const middleware = withUser({
      jwtSecret: jwtKey,
      jwtAudience: opts.audience,
      jwtIssuer: opts.issuer
    });

    middleware(req, res, err => {
      expect(err).toBeUndefined();
      expect(req.user).toMatchObject(user);

      done();
    });
  });

  it("should allow requests without token, not adding user to request", done => {
    const req = new MockExpressRequest();
    const res = new MockExpressResponse();

    const middleware = withUser({
      jwtSecret: jwtKey,
      jwtAudience: opts.audience,
      jwtIssuer: opts.issuer
    });

    middleware(req, res, err => {
      expect(err).toBeUndefined();
      expect(req.user).toBeUndefined();

      done();
    });
  });

  it("should allow requests with invalid token, not adding user to request", done => {
    const idToken = jwt.sign(user, otherKey, opts);
    const req = new MockExpressRequest({
      cookies: { access_token: idToken }
    });
    const res = new MockExpressResponse();

    const middleware = withUser({
      jwtSecret: jwtKey,
      jwtAudience: opts.audience,
      jwtIssuer: opts.issuer
    });

    middleware(req, res, err => {
      expect(err).toBeUndefined();
      expect(req.user).toBeUndefined();

      done();
    });
  });

  it("should allow requests with expired token, not adding user to request", done => {
    const idToken = jwt.sign(user, jwtKey, { ...opts, expiresIn: -10 });
    const req = new MockExpressRequest({
      cookies: { access_token: idToken }
    });
    const res = new MockExpressResponse();

    const middleware = withUser({
      jwtSecret: jwtKey,
      jwtAudience: opts.audience,
      jwtIssuer: opts.issuer
    });

    middleware(req, res, err => {
      expect(err).toBeUndefined();
      expect(req.user).toBeUndefined();

      done();
    });
  });
});
