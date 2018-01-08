import React from 'react'
import { QueryRenderer } from 'react-relay'
import apiInterface from 'accelerate-api-interface'
import NoSSR from 'react-no-ssr'

export default (ComposedComponent, options = {}) => class WithData extends React.Component {
  static displayName = `WithData(${ComposedComponent.displayName || ComposedComponent.name})`
  
  environment = apiInterface()

  render () {
    return (
      <NoSSR>
        <QueryRenderer
          environment={this.environment}
          query={options.query}
          render={({ props, error }) => {
            if (error) {
              throw error
            }

            if (props) {
              return <ComposedComponent {...this.props} {...props} />
            }

            return null
          }}
        />
      </NoSSR>
    )
  }
}
