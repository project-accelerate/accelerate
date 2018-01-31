import React from "react";
import { fetchQuery } from "react-relay";
import PropTypes from "prop-types";
import RelayContextProvider from "relay-context-provider";
import createEnvironment from "accelerate-api-interface";
import { BACKEND_URL } from "../config";

/**
 * Wrap a top-level page component with a NextJS getInitialProps() method
 * to fetch the data required for the page before starting to render it.
 */
export default ({ query }) => ComposedComponent =>
  class extends React.Component {
    static displayName = `WithData(${ComposedComponent.displayName ||
      ComposedComponent.name})`;

    static async getInitialProps(ctx) {
      const inheritedProps = ComposedComponent.getInitialProps
        ? await ComposedComponent.getInitialProps(ctx)
        : {};

      // Get the appropriate Relay environment
      const environment = createEnvironment({
        backendUrl: BACKEND_URL
      });

      // Provide page query params and any other initial props fetched for
      // the page as variables to the page's Relay query.
      const variables = {
        ...ctx.query,
        ...inheritedProps
      };

      // Fetch the page data and get the store contents in JSON form for
      // rehydration
      const queryProps = await fetchQuery(environment, query, variables);
      const queryRecords = environment
        .getStore()
        .getSource()
        .toJSON();

      return {
        ...inheritedProps,
        ...queryProps,
        queryRecords
      };
    }

    static propTypes = {
      queryRecords: PropTypes.objectOf(PropTypes.any).isRequired
    };

    get variables() {
      return {};
    }

    environment = createEnvironment({
      backendUrl: BACKEND_URL,
      records: this.props.queryRecords
    });

    render() {
      return (
        <RelayContextProvider
          environment={this.environment}
          variables={this.variables}
        >
          <ComposedComponent {...this.props} />
        </RelayContextProvider>
      );
    }
  };
