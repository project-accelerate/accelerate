import React from "react";
import { StateWrapper } from "./withStateWrapper";

export function withHeight(height) {
  return storyFn => (
    <div style={{ position: "relative", height }}>{storyFn()}</div>
  );
}

export function withStateWrapper(storyFn) {
  return <StateWrapper>{storyFn()}</StateWrapper>;
}
