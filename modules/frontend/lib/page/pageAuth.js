import { constant } from "lodash";
import * as React from "react";
import Router from "next/router";
import cookies from "browser-cookies";
import PropTypes from "prop-types";
import { wrapDisplayName } from "recompose";

/**
 * Redirect users who aren't allowed to see the page.
 *
 * This is all cosmetic (authentication is really implemented on the backend),
 * but it's good UX to redirect users when the're logged out rather than just
 * error.
 */
export function pageAuth({ auth = constant(true), redirectPage = "/login" }) {
  return WrappedComponent =>
    class AuthenticatedPage extends React.Component {
      static displayName = wrapDisplayName(WrappedComponent, "pageAuth");

      static async getInitialProps(params) {
        const { req, res } = params;
        const user = await getUser(req);

        // Redirect if we're not allowed here
        if (!auth(user)) {
          if (res) {
            return res.redirect(301, redirectPage);
          }

          return Router.replace(redirectPage);
        }

        // Otherwise return the user object, along with any
        // inherited initial props.
        const getInhertedProps = WrappedComponent.getInitialProps;
        const inheritedProps =
          getInhertedProps && (await getInhertedProps(params));

        return { ...inheritedProps, user };
      }

      static propTypes = {
        user: PropTypes.object
      };

      static defaultProps = {
        user: undefined
      };

      static childContextTypes = {
        user: PropTypes.object
      };

      getChildContext() {
        return { user: this.props.user };
      }

      render() {
        return <WrappedComponent {...this.props} />;
      }
    };
}

/**
 * Get the logged-in user from the incoming http request if we're server-side
 * or the remote endpoint if we're client-side.
 */
function getUser(req) {
  if (!req) {
    try {
      const userCookie = cookies.get("user");

      return userCookie && JSON.parse(userCookie);
    } catch (err) {
      return undefined;
    }
  }

  return req.user;
}
