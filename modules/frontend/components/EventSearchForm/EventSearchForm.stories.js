/* eslint-disable import/no-extraneous-dependencies */

import React from "react";
import { storiesOf } from "@storybook/react";
import EventSearchForm from "./EventSearchForm";
import { withHeight, withStateWrapper } from "../../lib/storyDecorators";

storiesOf("Components/EventSearchForm", module)
  .addDecorator(withStateWrapper)
  .addDecorator(withHeight(300))
  .add("standard", () => <EventSearchForm />);
