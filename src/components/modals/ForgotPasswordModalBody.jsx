import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import FormErrors from "../FormErrors";
import Validations from "../../utils/validations";
import AuthService from "../../services/AuthService";
import $ from "jquery";

class ForgotPasswordModal extends Component {
  state = { email: "", formErrors: [], cargando: false };

  handleCorreoChange = e => {
    this.setState({
      email: e.target.value
    });
  };

  handleConfirmarClick = e => {
    if (this.formValid()) {
      this.setState({ cargando: true });

      AuthService.resetPassword(this.state.email)
        .then(res => {
          if (res.status === 200) {
            this.setState({ email: "" });
          }
        })
        .catch(err => {})
        .finally(() => {
          this.setState({ cargando: false });
          $("#forgotPasswordModal").modal("hide");
        });
    }
  };

  formValid() {
    let formErrors = [];

    if (!Validations.required(this.state.email))
      formErrors.push({
        field: "Correo",
        error: "El correo es requerido."
      });
    else if (!Validations.email(this.state.email))
      formErrors.push({
        field: "Correo",
        error: "Introduce un correo válido."
      });

    this.setState({ formErrors });
    return formErrors.length === 0;
  }

  render() {
    const { formErrors, email, cargando } = this.state;

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
                formErrors.some(e => e.field === "Correo") ? "is-invalid" : ""
              }`}
              value={email}
              placeholder="Correo"
              onChange={this.handleCorreoChange}
            />
          </div>
          <small className="text-secondary">
            Si el email ingresado coincide con el que tenemos registrado, se te
            enviará un correo con las instrucciones para resetear tu password.
          </small>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            data-dismiss="modal"
          >
            Cerrar
          </button>
          <button
            type="button"
            className={`btn btn-success ${cargando ? " disabled" : ""}`}
            onClick={this.handleConfirmarClick}
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

            {cargando ? "Enviando..." : "Enviar"}
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default ForgotPasswordModal;
