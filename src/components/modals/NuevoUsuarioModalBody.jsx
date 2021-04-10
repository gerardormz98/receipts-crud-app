import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";
import Validations from "../../utils/validations";
import FormErrors from "./../FormErrors";
import UsuarioService from "./../../services/UsuarioService";
import { DEFAULT_ERROR } from "../../utils/constants";
import $ from "jquery";

class NuevoReciboModalBody extends Component {
  state = {
    email: "",
    password: "",
    passwordConfirm: "",
    isAdmin: false,
    formErrors: [],
    cargando: false
  };

  handleCorreoChange = e => {
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

  handleEsAdminChange = e => {
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

  handleConfirmarClick = e => {
    if (this.formValid()) {
      this.setState({ cargando: true });

      const { email, password, isAdmin } = this.state;

      UsuarioService.postUsuario(email, password, isAdmin)
        .then(res => {
          if (res.status === 201) {
            this.props.onUsuarioAdded();
            this.cleanFields();
            $("#nuevoUsuarioModal").modal("hide");
          }
        })
        .catch(err => {
          let message = DEFAULT_ERROR;
          if (err.response.data.message) message = err.response.data.message;

          alert(message);
        })
        .finally(() => {
          this.setState({ cargando: false });
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

    if (!Validations.required(this.state.password))
      formErrors.push({
        field: "Password",
        error: "La contraseña es requerida."
      });
    else if (!Validations.minLength(this.state.password, 8))
      formErrors.push({
        field: "Password",
        error: "La contraseña debe tener mínimo 8 caracteres."
      });

    if (!Validations.required(this.state.passwordConfirm))
      formErrors.push({
        field: "Password",
        error: "Confirma la contraseña."
      });
    else if (
      !Validations.stringEquals(this.state.password, this.state.passwordConfirm)
    )
      formErrors.push({
        field: "Password",
        error: "Las contraseñas no coinciden."
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
      cargando
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
                formErrors.some(e => e.field === "Correo") ? "is-invalid" : ""
              }`}
              value={email}
              placeholder="Correo"
              onChange={this.handleCorreoChange}
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
              placeholder="Contraseña"
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
              placeholder="Confirmar contraseña"
              onChange={this.handlePasswordConfirmChange}
            />
          </div>

          <div className="form-check ml-1">
            <input
              className="form-check-input"
              type="checkbox"
              checked={isAdmin}
              id="checkAdministrador"
              onChange={this.handleEsAdminChange}
            />
            <label className="form-check-label" htmlFor="checkAdministrador">
              Administrador
            </label>
          </div>

          <small className="text-secondary d-block pl-4">
            Los usuarios administradores pueden agregar nuevos usuarios y
            modificar los catálogos.
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

            {cargando ? "Agregando..." : "Agregar"}
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default NuevoReciboModalBody;
