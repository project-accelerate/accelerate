import { compose } from "recompose";
import withStyles from "material-ui/styles/withStyles";
import { base } from "../../styles/base";
import pageData from "./pageData";
import withMaterialUI from "../material-ui/withMaterialUI";
import { pageAuth } from "./pageAuth";

export function pageRoot({ query, auth, redirectPage } = {}) {
  return compose(
    // Redirect to login if needed
    pageAuth({ auth, redirectPage }),

    // Fetch any data dependencies
    pageData({ query }),

    // Install material-ui styling engine on the page
    withMaterialUI,

    // Add our base css to the page
    withStyles({ "@global": base })
  );
}
