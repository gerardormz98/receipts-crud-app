import React, { Component } from "react";
import AuthService from "../../services/AuthService";
import { DEFAULT_ERROR } from "../../utils/constants";
import $ from "jquery";

class ChangePasswordModalBody extends Component {
  state = { loading: false };

  handleConfirmClick = e => {
    this.setState({ loading: true });

    AuthService.resetPassword(this.props.user.email)
      .then(res => {
        if (res.status === 200) {
          this.props.onPasswordSent();
          $("#changePasswordModal").modal("hide");
        }
      })
      .catch(err => {
        alert(DEFAULT_ERROR);
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  render() {
    const { user } = this.props;
    const { loading } = this.state;

    return (
      <React.Fragment>
        <div className="modal-body p-4">
          <span>
            An email will be sent to <b>{user.email}</b>. Are you sure you want to change your password?
          </span>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            data-dismiss="modal"
          >
            Close
          </button>
          <button
            type="button"
            className={`btn btn-success ${loading ? " disabled" : ""}`}
            onClick={this.handleConfirmClick}
          >
            {loading ? (
              <span
                className="spinner-border spinner-border-sm mr-2"
                style={{ marginBottom: 2 }}
                role="status"
              ></span>
            ) : (
              ""
            )}

            {loading ? "Sending..." : "Confirm"}
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default ChangePasswordModalBody;
