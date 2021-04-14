import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import UserService from "../../services/UserService";
import AuthService from "../../services/AuthService";
import { DEFAULT_ERROR } from "../../utils/constants";
import $ from "jquery";

class EditUserModalBody extends Component {
  state = {
    email: "",
    isAdmin: "",
    loading: false
  };

  handleIsAdminChange = e => {
    this.setState({
      isAdmin: e.target.checked
    });
  };

  handleConfirmClick = e => {
    this.setState({ loading: true });

    const user = AuthService.getUserInfo();

    if (user.email === this.state.email) {
      alert("You can't edit your own admin user.");
      $("#editUserModal").modal("hide");
      this.setState({ loading: false });
    } else {
      const { isAdmin } = this.state;
      const { userID } = this.props.user;

      UserService.putUser(userID, isAdmin)
        .then(res => {
          if (res.status === 200) {
            this.props.onUserEdited();
            $("#editUserModal").modal("hide");
          }
        })
        .catch(err => {
          let message = DEFAULT_ERROR;
          if (err.response.data.message) message = err.response.data.message;

          alert(message);
        })
        .finally(() => {
          this.setState({ loading: false });
        });
    }
  };

  componentDidUpdate(prevProps) {
    if (this.props.user !== prevProps.user) {
      this.setState({
        email: this.props.user.email,
        isAdmin: this.props.user.isAdmin
      });
    }
  }

  render() {
    const { email, isAdmin, loading } = this.state;

    return (
      <React.Fragment>
        <div className="modal-body p-4">
          <div className="input-group mb-2">
            <div className="input-group-prepend">
              <div className="input-group-text">
                <FontAwesomeIcon icon={faEnvelope} />
              </div>
            </div>
            <input
              type="text"
              className="form-control"
              value={email}
              placeholder="Email"
              readOnly
            />
          </div>

          <div className="form-check ml-1">
            <input
              className="form-check-input"
              type="checkbox"
              checked={isAdmin}
              id="checkAdminEdit"
              onChange={this.handleIsAdminChange}
            />
            <label
              className="form-check-label"
              htmlFor="checkAdminEdit"
            >
              Admin
            </label>
          </div>

          <small className="text-secondary d-block pl-4">
            Admin users can create new users and modify the catalogs.
          </small>
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
            className={`btn btn-info ${loading ? " disabled" : ""}`}
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

            {loading ? "Editing..." : "Edit"}
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default EditUserModalBody;
