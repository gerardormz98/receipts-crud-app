import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";
import Validations from "../../utils/validations";
import FormErrors from "../FormErrors";
import UserService from "../../services/UserService";
import { DEFAULT_ERROR } from "../../utils/constants";
import $ from "jquery";

class NewUserModalBody extends Component {
  state = {
    email: "",
    password: "",
    passwordConfirm: "",
    isAdmin: false,
    formErrors: [],
    loading: false
  };

  handleEmailChange = e => {
    this.setState({
      email: e.target.value
    });
  };

  handlePasswordChange = e => {
    this.setState({
      password: e.target.value
    });
  };

  handlePasswordConfirmChange = e => {
    this.setState({
      passwordConfirm: e.target.value
    });
  };

  handleIsAdminChange = e => {
    this.setState({
      isAdmin: e.target.checked
    });
  };

  cleanFields = () => {
    this.setState({
      email: "",
      password: "",
      passwordConfirm: "",
      isAdmin: false
    });
  };

  handleConfirmClick = e => {
    if (this.formValid()) {
      this.setState({ loading: true });

      const { email, password, isAdmin } = this.state;

      UserService.postUser(email, password, isAdmin)
        .then(res => {
          if (res.status === 201) {
            this.props.onUserAdded();
            this.cleanFields();
            $("#newUserModal").modal("hide");
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

  formValid() {
    let formErrors = [];

    if (!Validations.required(this.state.email))
      formErrors.push({
        field: "Email",
        error: "The email is required."
      });
    else if (!Validations.email(this.state.email))
      formErrors.push({
        field: "Email",
        error: "Please enter a valid email."
      });

    if (!Validations.required(this.state.password))
      formErrors.push({
        field: "Password",
        error: "The password is required."
      });
    else if (!Validations.minLength(this.state.password, 8))
      formErrors.push({
        field: "Password",
        error: "The password must be at least 8 characters."
      });

    if (!Validations.required(this.state.passwordConfirm))
      formErrors.push({
        field: "Password",
        error: "Please confirm the password."
      });
    else if (
      !Validations.stringEquals(this.state.password, this.state.passwordConfirm)
    )
      formErrors.push({
        field: "Password",
        error: "The passwords do not match."
      });

    this.setState({ formErrors });
    return formErrors.length === 0;
  }

  render() {
    const {
      formErrors,
      email,
      password,
      passwordConfirm,
      isAdmin,
      loading
    } = this.state;

    return (
      <React.Fragment>
        <div className="modal-body p-4">
          <FormErrors errors={formErrors} />

          <div className="input-group mb-2">
            <div className="input-group-prepend">
              <div className="input-group-text">
                <FontAwesomeIcon icon={faEnvelope} />
              </div>
            </div>
            <input
              type="text"
              className={`form-control ${
                formErrors.some(e => e.field === "Email") ? "is-invalid" : ""
              }`}
              value={email}
              placeholder="Email"
              onChange={this.handleEmailChange}
            />
          </div>

          <div className="input-group mb-2">
            <div className="input-group-prepend">
              <div className="input-group-text">
                <FontAwesomeIcon icon={faKey} />
              </div>
            </div>
            <input
              type="password"
              className={`form-control ${
                formErrors.some(e => e.field === "Password") ? "is-invalid" : ""
              }`}
              value={password}
              placeholder="Password"
              onChange={this.handlePasswordChange}
            />
          </div>

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <div className="input-group-text">
                <FontAwesomeIcon icon={faKey} />
              </div>
            </div>
            <input
              type="password"
              className={`form-control ${
                formErrors.some(e => e.field === "Password") ? "is-invalid" : ""
              }`}
              value={passwordConfirm}
              placeholder="Confirm password"
              onChange={this.handlePasswordConfirmChange}
            />
          </div>

          <div className="form-check ml-1">
            <input
              className="form-check-input"
              type="checkbox"
              checked={isAdmin}
              id="checkAdmin"
              onChange={this.handleIsAdminChange}
            />
            <label className="form-check-label" htmlFor="checkAdmin">
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

            {loading ? "Creating..." : "Create"}
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default NewUserModalBody;
