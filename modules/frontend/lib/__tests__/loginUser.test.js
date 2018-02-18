/* eslint-env jest */

import fetch from "isomorphic-fetch";
import {
  loginUser,
  E_INVALID_CREDENTIALS,
  E_UNEXPECTED_ERROR,
  E_NETWORK_ERROR
} from "../loginUser";

describe("loginUser", () => {
  it("should report success", async () => {
    fetch.mockImplementation(() =>
      Promise.resolve(new Response(undefined, { status: 201 }))
    );

    expect(await loginUser({ username: "user", password: "pass" })).toEqual({
      succeeded: true
    });
  });

  it("should report invalid credentials", async () => {
    fetch.mockImplementation(() =>
      Promise.resolve(new Response(undefined, { status: 401 }))
    );

    expect(await loginUser({ username: "user", password: "pass" })).toEqual({
      reason: E_INVALID_CREDENTIALS,
      succeeded: false
    });
  });

  it("should report unexpected error", async () => {
    fetch.mockImplementation(() =>
      Promise.resolve(new Response(undefined, { status: 500 }))
    );

    expect(await loginUser({ username: "user", password: "pass" })).toEqual({
      reason: E_UNEXPECTED_ERROR,
      succeeded: false
    });
  });

  it("should report network error", async () => {
    fetch.mockImplementation(() => Promise.reject(Error()));

    expect(await loginUser({ username: "user", password: "pass" })).toEqual({
      reason: E_NETWORK_ERROR,
      succeeded: false
    });
  });
});
