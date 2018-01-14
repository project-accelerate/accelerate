/* eslint-disable import/no-extraneous-dependencies */

import React from "react";
import { storiesOf } from "@storybook/react";
import EventSearchForm from "./EventSearchForm";

storiesOf("Components/EventSearchForm", module).add("standard", () => (
  <EventSearchForm />
));
