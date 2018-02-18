import * as React from "react";
import { wrapDisplayName, hoistStatics } from "recompose";
import { fromPairs, pickBy } from "lodash";

/**
 * Utility HOC for binding form fields.
 *
 * This adds the following props to the wrapped component:
 *
 *   * a `fields` property containing form binding props suitable for
 *      attaching to an input element
 *
 *   * a `formValue` property containing form value as a single object.
 *
 *   * a `formIsValid` property indicating whether all fields pass validation.
 *
 *   * a `fieldErrors`property  mapping field ids to validation errors.
 *
 * @param {object} fields Array of ids for each field
 *
 * @param {function} validate
 *  Validator function. Should return either:
 *
 *    * Boolean indicating success or failure
 *  or:
 *    * Object mapping field keys to validation errors
 *
 */
export function form({ fields, validate = () => {} }) {
  return hoistStatics(
    WrappedComponent =>
      class Form extends React.Component {
        static displayName = wrapDisplayName(WrappedComponent, "form");

        state = {
          values: fromPairs(fields.map(key => [key, ""])),
          blurred: {}
        };

        get validationErrors() {
          const validationResult = validate(this.state.values) || {};
          return pickBy(validationResult, (_, key) => this.state.blurred[key]);
        }

        get isValid() {
          const validationErrors = validate(this.state.values);
          return (
            validationErrors && !fields.some(field => validationErrors[field])
          );
        }

        get fields() {
          return fromPairs(
            fields.map(field => [
              field,
              {
                onChange: event => {
                  this.setState({
                    values: {
                      ...this.state.values,
                      [field]: event.currentTarget.value
                    }
                  });
                },
                onBlur: () => {
                  this.setState({
                    blurred: {
                      ...this.state.blurred,
                      [field]: true
                    }
                  });
                },
                value: this.state.values[field]
              }
            ])
          );
        }

        render() {
          return (
            <WrappedComponent
              {...this.props}
              fields={this.fields}
              formValue={this.state.values}
              formIsValid={this.isValid}
              fieldErrors={this.validationErrors}
            />
          );
        }
      }
  );
}
