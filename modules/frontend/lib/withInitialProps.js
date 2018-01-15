import React from "react";
import { fromPairs } from "lodash";

export function withInitialProps(fetchers) {
  return ComposedComponent =>
    class extends React.Component {
      static displayName = `withInitialProps(${ComposedComponent.displayName ||
        ComposedComponent.name})`;

      static async getInitialProps(ctx) {
        const inheritedProps = ComposedComponent.getInitialProps
          ? await ComposedComponent.getInitialProps(ctx)
          : {};

        const keys = Object.keys(fetchers);

        const fetchedValues = await Promise.all(
          keys.map(key => fetchers[key](ctx))
        );

        const fetchedProps = fromPairs(
          keys.map((key, i) => [key, fetchedValues[i]])
        );

        return {
          ...inheritedProps,
          ...fetchedProps
        };
      }

      render() {
        return <ComposedComponent {...this.props} />;
      }
    };
}
