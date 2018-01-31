import { compose } from "recompose";
import withStyles from "material-ui/styles/withStyles";
import { base } from "../../styles/base";
import pageData from "./pageData";
import withMaterialUI from "../material-ui/withMaterialUI";

export function pageRoot({ query }) {
  return compose(
    // Fetch any data dependencies
    pageData({ query }),

    // Install material-ui styling engine on the page
    withMaterialUI,

    // Add our base css to the page
    withStyles({ "@global": base })
  );
}
