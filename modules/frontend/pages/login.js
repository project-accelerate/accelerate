import React from "react";
import * as PropTypes from "prop-types";
import { compose } from "recompose";
import Router from "next/router";
import TextField from "material-ui/TextField";
import Button from "material-ui/Button";
import CircularProgress from "material-ui/Progress/CircularProgress";
import { actions } from "../lib/action";
import { loginUser } from "../lib/loginUser";
import { form } from "../lib/form";
import { pageRoot } from "../lib/page/page";
import { isLoggedOut } from "../lib/page/guards";

function LoginPage({ onSubmit, fields: { username, password }, formIsValid }) {
  if (onSubmit.pending || onSubmit.succeeded) {
    return (
      <div>
        <CircularProgress />
        Logging you in...
      </div>
    );
  }

  return (
    <form method="none" onSubmit={onSubmit}>
      {onSubmit.failed && <span id="error">{onSubmit.reason}</span>}

      <TextField
        fullWidth
        id="email"
        label="Email"
        variant="email"
        autoComplete="email"
        margin="normal"
        error={onSubmit.failed}
        {...username}
      />

      <TextField
        fullWidth
        id="password"
        label="Password"
        variant="password"
        type="password"
        autoComplete="current-password"
        margin="normal"
        error={onSubmit.failed}
        {...password}
      />

      <Button
        id="submit"
        disabled={!formIsValid}
        type="button"
        onClick={onSubmit}
      >
        Log In
      </Button>
    </form>
  );
}

LoginPage.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired,
  formIsValid: PropTypes.bool.isRequired
};

export default compose(
  pageRoot({
    auth: isLoggedOut,
    redirectPage: "/"
  }),
  form({
    fields: ["username", "password"],
    validate: ({ username, password }) => username && password
  }),
  actions({
    async onSubmit({ formValue: { username, password } }) {
      const { succeeded, reason } = await loginUser({ username, password });

      if (succeeded) {
        Router.replace("/");
        return { succeeded: true };
      }

      return { failed: true, reason };
    }
  })
)(LoginPage);
