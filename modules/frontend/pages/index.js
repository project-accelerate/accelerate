import React from "react";
import { isLoggedIn } from "accelerate-authentication";
import { compose } from "recompose";
import { pageRoot } from "../lib/page/page";

function IndexPage() {
  return (
    <div>
      This page is for logged in users only<br />
      Not much here to see yet, though.
    </div>
  );
}

export default compose(pageRoot({ auth: isLoggedIn }))(IndexPage);
