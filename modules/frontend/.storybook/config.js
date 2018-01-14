import * as React from "react";
import { configure, addDecorator } from "@storybook/react";
import Page from "../components/Page";

function loadStories() {
  const storyContext = require.context("../components", true, /\.stories\.js$/);
  storyContext.keys().forEach(storyContext);
}

addDecorator(storyFn => (
  <div>
    <Page>{storyFn()}</Page>
  </div>
));

configure(loadStories, module);
