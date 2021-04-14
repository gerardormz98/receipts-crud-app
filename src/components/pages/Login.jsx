import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import AuthService from "./../../services/AuthService";
import "./Login.css";
import $ from "jquery";
import Validations from "../../utils/validations";
import { DEFAULT_ERROR } from "../../utils/constants";
import FormErrors from "./../FormErrors";
import Modal from "./../modals/Modal";
import ForgotPasswordModalBody from "./../modals/ForgotPasswordModalBody";

class Login extends Component {
  state = {
    email: "",
    password: "",
    message: "",
    formErrors: [],
    loading: false
  };

  componentDidMount() {
    localStorage.clear();
    this.hideErrorAlert();
  }

  handlePasswordChange = e => {
    this.setState({
      password: e.target.value
    });
  };

  handleEmailChange = e => {
    this.setState({
      email: e.target.value
    });
  };

  handleLoginClick = e => {
    e.preventDefault();
    this.hideErrorAlert();

    if (this.formValid()) {
      this.setState({ loading: true });

      AuthService.login(this.state.email, this.state.password)
        .then(res => {
          if (res.status === 200) {
            localStorage.setItem("auth", JSON.stringify(res.data));
            this.props.onLogin();
            this.props.history.push("/receipts");
          } else {
            throw new Error();
          }
        })
        .catch(err => {
          if (err.response) {
         	  if (err.response.data.message)
              this.setState({ message: err.response.data.message });
            else if (err.response.data.errors)
              this.setState({ message: "Please verify the entered data." });
          }
          else {
            this.setState({ message: DEFAULT_ERROR });
          }

          this.setState({ loading: false });
          this.showErrorAlert();
        });
    }
  };

  formValid() {
    const { email, password } = this.state;
    let formErrors = [];

    if (!Validations.required(email))
      formErrors.push({
        field: "Email",
        error: "The email is required."
      });
    else if (!Validations.email(email))
      formErrors.push({
        field: "Email",
        error: "Please enter a valid email."
      });

    if (!Validations.required(password))
      formErrors.push({
        field: "Password",
        error: "The passowrd is required."
      });

    this.setState({ formErrors });
    return formErrors.length === 0;
  }

  showErrorAlert() {
    $("#errorAlert").show();
  }

  hideErrorAlert() {
    $("#errorAlert").hide();
  }

  render() {
    const { email, password, message, formErrors, loading } = this.state;

    return (
      <React.Fragment>
        <div className="backgroundImage w-100 vh-100"></div>

        <div className="vh-100 d-flex justify-content-center align-items-center">
          <div className="p-5 col-10 col-md-8 col-lg-5 bg-white rounded border">
            <div className="mb-3 text-center d-flex flex-row justify-content-center align-items-center">
              <img
                src="img/receipt-icon.svg"
                className="imgLogin mr-3 mb-2"
                alt=""
              ></img>
              <h3>Receipts App</h3>
            </div>

            <hr />

            <FormErrors errors={formErrors} />

            <div id="errorAlert" className="alert alert-danger" role="alert">
              <small>
                <strong>Error: </strong>
                {message}
              </small>
            </div>

            <form onSubmit={this.handleLoginClick}>
              <div className="input-group mb-2">
                <div className="input-group-prepend">
                  <div className="input-group-text">
                    <FontAwesomeIcon icon={faEnvelope} />
                  </div>
                </div>
                <input
                  type="text"
                  className={`form-control ${
                    formErrors.some(e => e.field === "Email")
                      ? "is-invalid"
                      : ""
                  }`}
                  placeholder="Email"
                  value={email}
                  onChange={this.handleEmailChange}
                  autoFocus
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
                    formErrors.some(e => e.field === "Password")
                      ? "is-invalid"
                      : ""
                  }`}
                  placeholder="Password"
                  value={password}
                  onChange={this.handlePasswordChange}
                />
              </div>

              <button
                type="submit"
                className={`btn btn-primary btn-block rounded-pill ${
                  loading ? "btn-secondary disabled" : ""
                }`}
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

                {loading ? "Signing in..." : "Sign in"}
              </button>
            </form>

            <hr />

            <button
              type="button"
              className="btn btn-link btn-sm ml-auto"
              data-toggle="modal"
              data-target="#forgotPasswordModal"
              disabled={loading}
            >
              Forgot password?
            </button>
          </div>
        </div>

        <Modal
          modalId="forgotPasswordModal"
          modalTitle="Password recovery"
          modalBody={<ForgotPasswordModalBody />}
        />
      </React.Fragment>
    );
  }
}

export default Login;
