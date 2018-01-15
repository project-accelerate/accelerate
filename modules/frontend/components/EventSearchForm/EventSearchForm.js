import React from "react";
import PropTypes from "prop-types";
import Button from "material-ui/Button";
import TextField from "material-ui/TextField";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "material-ui/Dialog";
import { lookupPostcodeFromUserLocation } from "../../lib/lookupPostcode";

export default class EventSearchDialog extends React.Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
    onCommit: PropTypes.func.isRequired,
    defaultValue: PropTypes.string
  };

  static defaultProps = {
    defaultValue: ""
  };

  handleUseLocation = async () => {
    const postcode = await lookupPostcodeFromUserLocation();

    if (!postcode) {
      return;
    }

    this.props.onCommit(postcode);
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onCommit(event.currentTarget.querySelector("#postcode").value);
  };

  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.onCancel}
        aria-labelledby="form-dialog-title"
      >
        <form autoComplete="false" onSubmit={this.handleSubmit}>
          <DialogTitle id="form-dialog-title">Find events near you</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter your postcode to find meetups and groups near you.
            </DialogContentText>
            <TextField
              defaultValue={this.props.defaultValue}
              id="postcode"
              type="text"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleUseLocation}>Use my Location</Button>
            <Button type="submit">OK</Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  }
}
