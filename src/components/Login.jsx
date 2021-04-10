import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import AuthService from "./../services/AuthService";
import "./Login.css";
import $ from "jquery";
import Validations from "../validations";
import { DEFAULT_ERROR } from "../constants";
import FormErrors from "./FormErrors";
import Modal from "./modals/Modal";
import ForgotPasswordModalBody from "./modals/ForgotPasswordModalBody";

class Login extends Component {
  state = {
    correo: "",
    password: "",
    message: "",
    formErrors: [],
    cargando: false
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

  handleCorreoChange = e => {
    this.setState({
      correo: e.target.value
    });
  };

  handleLoginClick = e => {
    e.preventDefault();
    this.hideErrorAlert();

    if (this.formValid()) {
      this.setState({ cargando: true });

      AuthService.login(this.state.correo, this.state.password)
        .then(res => {
          if (res.status === 200) {
            localStorage.setItem("auth", JSON.stringify(res.data));
            this.props.onLogin();
            this.props.history.push("/recibos");
          } else {
            throw new Error();
          }
        })
        .catch(err => {
          if (err.response) {
         	  if (err.response.data.message)
              this.setState({ message: err.response.data.message });
            else if (err.response.data.errors)
              this.setState({ message: "Verifica los datos ingresados." });
          }
          else {
            this.setState({ message: DEFAULT_ERROR });
          }

          this.setState({ cargando: false });
          this.showErrorAlert();
        });
    }
  };

  formValid() {
    const { correo, password } = this.state;
    let formErrors = [];

    if (!Validations.required(correo))
      formErrors.push({
        field: "Correo",
        error: "El correo es requerido."
      });
    else if (!Validations.email(correo))
      formErrors.push({
        field: "Correo",
        error: "Introduce un correo válido."
      });

    if (!Validations.required(password))
      formErrors.push({
        field: "Contraseña",
        error: "La contraseña es requerida."
      });

    this.setState({ formErrors });
    return formErrors.length === 0;
  }

  showErrorAlert() {
    $("#alertError").show();
  }

  hideErrorAlert() {
    $("#alertError").hide();
  }

  render() {
    const { correo, password, message, formErrors, cargando } = this.state;

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

            <div id="alertError" className="alert alert-danger" role="alert">
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
                    formErrors.some(e => e.field === "Correo")
                      ? "is-invalid"
                      : ""
                  }`}
                  placeholder="Correo"
                  value={correo}
                  onChange={this.handleCorreoChange}
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
                    formErrors.some(e => e.field === "Contraseña")
                      ? "is-invalid"
                      : ""
                  }`}
                  placeholder="Contraseña"
                  value={password}
                  onChange={this.handlePasswordChange}
                />
              </div>

              <button
                type="submit"
                className={`btn btn-primary btn-block rounded-pill ${
                  cargando ? "btn-secondary disabled" : ""
                }`}
              >
                {cargando ? (
                  <span
                    className="spinner-border spinner-border-sm mr-2"
                    style={{ marginBottom: 2 }}
                    role="status"
                  ></span>
                ) : (
                  ""
                )}

                {cargando ? "Iniciando sesión..." : "Iniciar Sesión"}
              </button>
            </form>

            <hr />

            <button
              type="button"
              className="btn btn-link btn-sm ml-auto"
              data-toggle="modal"
              data-target="#forgotPasswordModal"
              disabled={cargando}
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>
        </div>

        <Modal
          modalId="forgotPasswordModal"
          modalTitle="Recuperar contraseña"
          modalBody={<ForgotPasswordModalBody />}
        />
      </React.Fragment>
    );
  }
}

export default Login;
