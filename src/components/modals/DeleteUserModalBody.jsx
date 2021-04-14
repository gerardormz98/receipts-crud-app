import React, { Component } from "react";
import UserService from "../../services/UserService";
import AuthService from "../../services/AuthService";
import { DEFAULT_ERROR } from "../../utils/constants";
import $ from "jquery";

class DeleteUserModalBody extends Component {
  state = { loading: false };

  handleConfirmClick = e => {
    this.setState({ loading: true });

    const user = AuthService.getUserInfo();

    if (user.email === this.props.user.email) {
      alert("You can't delete your own admin user.");
      $("#deleteUserModal").modal("hide");
      this.setState({ loading: false });
    } else {
      UserService.deleteUser(this.props.user.userID)
        .then(res => {
          if (res.status === 204) {
            this.props.onUserDeleted();
            $("#deleteUserModal").modal("hide");
          }
        })
        .catch(err => {
          alert(DEFAULT_ERROR);
        })
        .finally(() => {
          this.setState({ loading: false });
        });
    }
  };

  render() {
    const { loading } = this.state;
    const { email } = this.props.user;

    return (
      <React.Fragment>
        <div className="modal-body p-4">
          <span>
            Are you sure you want to delete the user: <b>{email}</b>?
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
            className={`btn btn-danger ${loading ? " disabled" : ""}`}
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

            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default DeleteUserModalBody;
