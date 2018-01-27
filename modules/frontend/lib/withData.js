import React from "react";
import { fetchQuery } from "react-relay";
import PropTypes from "prop-types";
import RelayContextProvider from "relay-context-provider";
import createEnvironment from "accelerate-api-interface";
import { BACKEND_URL } from "./config";

export default ({ query }) => ComposedComponent =>
  class extends React.Component {
    static displayName = `WithData(${ComposedComponent.displayName ||
      ComposedComponent.name})`;

    static async getInitialProps(ctx) {
      const inheritedProps = ComposedComponent.getInitialProps
        ? await ComposedComponent.getInitialProps(ctx)
        : {};

      const environment = createEnvironment({
        backendUrl: BACKEND_URL
      });

      const variables = {
        ...ctx.query,
        ...inheritedProps
      };

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
