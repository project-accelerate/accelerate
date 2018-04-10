/* eslint-env jest */
/* eslint-disable react/prop-types */

import React from "react";
import { mount } from "enzyme";
import { form } from "../form";

describe("form", () => {
  const mountFixture = (opts = {}) => {
    const WrappedComponent = ({ fields: { aField } }) => <input {...aField} />;
    const Form = form({ fields: ["aField"], ...opts })(WrappedComponent);

    return mount(<Form />);
  };

  it("should initialize input value", () => {
    const input = mountFixture()
      .find("input")
      .getElement();
    expect(input.props.value).toEqual("");
  });

  it("should update field value and form value on change", () => {
    const fixture = mountFixture();
    const input = fixture.find("input").getElement();

    input.props.onChange({ currentTarget: { value: "foo" } });
    fixture.update();

    expect(fixture.find("input").getElement().props.value).toEqual("foo");
    expect(
      fixture.find("WrappedComponent").getElement().props.formValue
    ).toEqual({ aField: "foo" });
  });

  it("should mark as valid when validator returns true", () => {
    const fixture = mountFixture({ validate: () => true });

    expect(
      fixture.find("WrappedComponent").getElement().props.formIsValid
    ).toBeTruthy();
  });

  it("should mark as invalid when validator returns false", () => {
    const fixture = mountFixture({ validate: () => false });

    expect(
      fixture.find("WrappedComponent").getElement().props.formIsValid
    ).toBeFalsy();
  });

  it("should mark as valid when validator returns an empty errors object", () => {
    const fixture = mountFixture({ validate: () => ({}) });

    expect(
      fixture.find("WrappedComponent").getElement().props.formIsValid
    ).toBeTruthy();
  });

  it("should mark as invalid when validator returns an error for some field", () => {
    const fixture = mountFixture({ validate: () => ({ aField: "Error" }) });

    expect(
      fixture.find("WrappedComponent").getElement().props.formIsValid
    ).toBeFalsy();
  });

  it("should pass error message to field after blur event", () => {
    const fixture = mountFixture({ validate: () => ({ aField: "Error" }) });
    const input = fixture.find("input").getElement();

    expect(
      fixture.find("WrappedComponent").getElement().props.fieldErrors.aField
    ).toBeFalsy();

    input.props.onBlur();
    fixture.update();

    expect(
      fixture.find("WrappedComponent").getElement().props.fieldErrors.aField
    ).toEqual("Error");
  });
});
