import * as React from "react";
import { wrapDisplayName } from "recompose";
import { mapValues } from "lodash";

/**
 * Utility HOC for handling async actions.
 *
 * Given a map of async functions for handling events, the events will be
 * passed into the wrapped component as props.
 *
 * The event handler may return an object containing result data.
 *
 * Each event handler will have:
 *
 *  * A property `pending`, indecating whether the action is in progress
 *  * A property, `error` if the action failed
 *  * Any properties in the result object.
 *
 * @param {object} actionPropMap
 */
export function actions(actionPropMap) {
  return WrappedComponent =>
    class Actions extends React.PureComponent {
      static displayName = wrapDisplayName(WrappedComponent, "actions");

      state = { actionState: {} };

      get actions() {
        return mapValues(actionPropMap, (handler, actionName) => {
          const action = (...args) => {
            this.perform(actionName, handler, args);
          };

          return Object.assign(action, this.state.actionState[actionName]);
        });
      }

      async perform(actionName, handler, args) {
        try {
          this.actionWillStart(actionName);
          const result = await handler(this.props, ...args);

          this.actionDidComplete(actionName, result);
        } catch (error) {
          this.actionDidFail(actionName, error);
        }
      }

      actionWillStart(action) {
        const { actionState } = this.state;
        this.setState({
          actionState: { ...actionState, [action]: { pending: true } }
        });
      }

      actionDidComplete(action, result) {
        const { actionState } = this.state;
        this.setState({
          actionState: {
            ...actionState,
            [action]: { pending: false, ...result }
          }
        });
      }

      actionDidFail(action, error) {
        const { actionState } = this.state;
        this.setState({
          actionState: { ...actionState, [action]: { pending: false, error } }
        });
      }

      render() {
        return <WrappedComponent {...this.props} {...this.actions} />;
      }
    };
}
