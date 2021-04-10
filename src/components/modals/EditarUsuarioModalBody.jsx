import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import UsuarioService from "../../services/UsuarioService";
import AuthService from "../../services/AuthService";
import { DEFAULT_ERROR } from "../../constants";
import $ from "jquery";

class EditarUsuarioModalBody extends Component {
  state = {
    email: "",
    isAdmin: "",
    cargando: false
  };

  handleEsAdminChange = e => {
    this.setState({
      isAdmin: e.target.checked
    });
  };

  handleConfirmarClick = e => {
    this.setState({ cargando: true });

    const user = AuthService.getUserInfo();

    if (user.email === this.state.email) {
      alert("No puedes editar tu propio usuario administrador.");
      $("#editarUsuarioModal").modal("hide");
      this.setState({ cargando: false });
    } else {
      const { isAdmin } = this.state;
      const { userID } = this.props.usuario;

      UsuarioService.putUsuario(userID, isAdmin)
        .then(res => {
          if (res.status === 200) {
            this.props.onUsuarioEdited();
            $("#editarUsuarioModal").modal("hide");
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

  componentDidUpdate(prevProps) {
    if (this.props.usuario !== prevProps.usuario) {
      this.setState({
        email: this.props.usuario.email,
        isAdmin: this.props.usuario.isAdmin
      });
    }
  }

  render() {
    const { email, isAdmin, cargando } = this.state;

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
              placeholder="Correo"
              readOnly
            />
          </div>

          <div className="form-check ml-1">
            <input
              className="form-check-input"
              type="checkbox"
              checked={isAdmin}
              id="checkAdministradorEditar"
              onChange={this.handleEsAdminChange}
            />
            <label
              className="form-check-label"
              htmlFor="checkAdministradorEditar"
            >
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
            className={`btn btn-info ${cargando ? " disabled" : ""}`}
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

            {cargando ? "Editando..." : "Editar"}
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default EditarUsuarioModalBody;
