/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";
import renderer from "react-test-renderer";
import fetch from "isomorphic-fetch";
import Router from "next/router";
import waitUntil from "async-wait-until";
import LoginPage from "../pages/login";
import { E_INVALID_CREDENTIALS } from "../lib/loginUser";

describe("/login", () => {
  const CORRECT_EMAIL = "me@example.com";
  const CORRECT_PASSWORD = "1234";

  beforeEach(() => {
    fetch.mockImplementation(async (url, req) => {
      const { username, password } = JSON.parse(req.body);
      if (username === CORRECT_EMAIL && password === CORRECT_PASSWORD) {
        return new Response(undefined, { status: 201 });
      }

      return new Response(undefined, { status: 401 });
    });
  });

  it("should match snapshot", () => {
    const tree = renderer.create(<LoginPage />);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it("should redirect user in when username and password are accepted", async () => {
    await logInWithCredentials({
      username: CORRECT_EMAIL,
      password: CORRECT_PASSWORD
    });

    expect(Router.replace).toHaveBeenCalledWith("/");
  });

  it("should remain on page and show error on failure", async () => {
    const tree = await logInWithCredentials({
      username: CORRECT_EMAIL,
      password: "invalid password"
    });

    expect(Router.replace).not.toHaveBeenCalled();
    expect(tree.containsMatchingElement(E_INVALID_CREDENTIALS)).toBeTruthy();
  });

  async function logInWithCredentials({ username, password }) {
    const tree = mount(<LoginPage />);
    const emailField = tree.find("input#email");
    const passwordField = tree.find("input#password");
    const login = tree.find("button#submit");

    emailField
      .getElement()
      .props.onChange({ currentTarget: { value: username } });
    passwordField
      .getElement()
      .props.onChange({ currentTarget: { value: password } });
    login.simulate("click");

    await waitUntil(() => {
      tree.update();
      const page = tree.find("LoginPage").getElement();
      return !page.props.onSubmit.pending;
    });

    return tree;
  }
});
