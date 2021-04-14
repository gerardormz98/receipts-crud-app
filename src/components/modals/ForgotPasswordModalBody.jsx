import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import FormErrors from "../FormErrors";
import Validations from "../../utils/validations";
import AuthService from "../../services/AuthService";
import $ from "jquery";

class ForgotPasswordModal extends Component {
  state = { email: "", formErrors: [], loading: false };

  handleEmailChange = e => {
    this.setState({
      email: e.target.value
    });
  };

  handleConfirmClick = e => {
    if (this.formValid()) {
      this.setState({ loading: true });

      AuthService.resetPassword(this.state.email)
        .then(res => {
          if (res.status === 200) {
            this.setState({ email: "" });
          }
        })
        .catch(err => {})
        .finally(() => {
          this.setState({ loading: false });
          $("#forgotPasswordModal").modal("hide");
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

    this.setState({ formErrors });
    return formErrors.length === 0;
  }

  render() {
    const { formErrors, email, loading } = this.state;

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
          <small className="text-secondary">
            If the email is registered, an email will be sent with the directions to reset your password.
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

            {loading ? "Sending..." : "Send"}
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default ForgotPasswordModal;
