/* eslint-env jest */
/* eslint-disable global-require */

import React from "react";
import MockRequest from "mock-express-request";
import MockResponse from "mock-express-response";
import cookies from "browser-cookies";
import Router from "next/router";
import { pageAuth } from "../pageAuth";

describe("pageAuthentication", () => {
  describe("when claims provided", () => {
    const isAdmin = user => user && user.isAdmin;

    describe("on server", () => {
      describe("and user not logged in", () => {
        it("should redirect", async () => {
          const req = new MockRequest();
          const res = new MockResponse();
          const Page = pageAuth({ auth: isAdmin })(Content);

          await Page.getInitialProps({ req, res });

          expect(res.statusCode).toBe(301);
        });
      });

      describe("and user logged in without matching claim", () => {
        it("should redirect", async () => {
          const req = new MockRequest();
          const res = new MockResponse();
          const Page = pageAuth({ auth: isAdmin })(Content);

          req.user = {};

          await Page.getInitialProps({ req, res });

          expect(res.statusCode).toBe(301);
        });
      });

      describe("and user logged in with matching claim", () => {
        it("should not redirect", async () => {
          const req = new MockRequest();
          const res = new MockResponse();
          const Page = pageAuth({ auth: isAdmin })(Content);

          req.user = {
            isAdmin: true
          };

          await Page.getInitialProps({ req, res });

          expect(res.statusCode).toBe(200);
        });
      });
    });

    describe("on client", () => {
      describe("and malformed cookie", () => {
        it("should redirect", async () => {
          const Page = pageAuth({ auth: isAdmin })(Content);
          mockUserCookie(":>,");

          await Page.getInitialProps({});

          expect(Router.replace).toHaveBeenCalled();
        });
      });

      describe("and user not logged in", () => {
        it("should redirect", async () => {
          const Page = pageAuth({ auth: isAdmin })(Content);

          await Page.getInitialProps({});

          expect(Router.replace).toHaveBeenCalled();
        });
      });

      describe("and user logged in with no matching claim", () => {
        it("should redirect", async () => {
          const Page = pageAuth({ auth: isAdmin })(Content);
          mockUserCookie(JSON.stringify({}));

          await Page.getInitialProps({});
          expect(Router.replace).toHaveBeenCalled();
        });
      });

      describe("and user logged in with matching claim", () => {
        it("should not redirect", async () => {
          const Page = pageAuth({ auth: isAdmin })(Content);
          mockUserCookie(
            JSON.stringify({
              isAdmin: true
            })
          );

          await Page.getInitialProps({});
          expect(Router.replace).not.toHaveBeenCalled();
        });
      });
    });
  });
});

const Content = () => <div />;

function mockUserCookie(value) {
  cookies.get.mockImplementation(key => (key === "user" ? value : null));
}
