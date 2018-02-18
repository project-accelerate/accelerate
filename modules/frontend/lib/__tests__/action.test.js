/* eslint-env jest */
/* eslint-disable react/prop-types */

import React from "react";
import { mount } from "enzyme";
import { actions } from "../action";

describe("action", () => {
  const mountFixture = actionMap => {
    const WrappedComponent = () => null;
    const Component = actions(actionMap)(WrappedComponent);

    return mount(<Component />);
  };

  it("should mark as pending during execution", () => {
    const fixture = mountFixture({ action: () => Promise.resolve() });
    fixture
      .find("WrappedComponent")
      .getElement()
      .props.action();

    fixture.update();

    const el = fixture.find("WrappedComponent").getElement();

    expect(el.props.action.pending).toBeTruthy();
  });

  it("should mark with error when fails", async () => {
    const fixture = mountFixture({ action: () => Promise.reject(Error()) });

    fixture
      .find("WrappedComponent")
      .getElement()
      .props.action();

    await Promise.resolve();
    fixture.update();

    const el = fixture.find("WrappedComponent").getElement();

    expect(el.props.action.pending).toBeFalsy();
    expect(el.props.action.error).toBeInstanceOf(Error);
  });

  it("should mark with result after succeeding", async () => {
    const fixture = mountFixture({
      action: () => Promise.resolve({ result: 1 })
    });

    fixture
      .find("WrappedComponent")
      .getElement()
      .props.action();

    await Promise.resolve();
    fixture.update();

    const el = fixture.find("WrappedComponent").getElement();

    expect(el.props.action.pending).toBeFalsy();
    expect(el.props.action.result).toBe(1);
  });
});
