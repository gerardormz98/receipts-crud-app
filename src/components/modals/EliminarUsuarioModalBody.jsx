import React, { Component } from "react";
import UsuarioService from "./../../services/UsuarioService";
import AuthService from "./../../services/AuthService";
import { DEFAULT_ERROR } from "../../utils/constants";
import $ from "jquery";

class EliminarUsuarioModalBody extends Component {
  state = { cargando: false };

  handleConfirmarClick = e => {
    this.setState({ cargando: true });

    const user = AuthService.getUserInfo();

    if (user.email === this.props.usuario.email) {
      alert("No puedes eliminar tu propio usuario administrador.");
      $("#eliminarUsuarioModal").modal("hide");
      this.setState({ cargando: false });
    } else {
      UsuarioService.deleteUsuario(this.props.usuario.userID)
        .then(res => {
          if (res.status === 204) {
            this.props.onUsuarioDeleted();
            $("#eliminarUsuarioModal").modal("hide");
          }
        })
        .catch(err => {
          alert(DEFAULT_ERROR);
        })
        .finally(() => {
          this.setState({ cargando: false });
        });
    }
  };

  render() {
    const { cargando } = this.state;
    const { email } = this.props.usuario;

    return (
      <React.Fragment>
        <div className="modal-body p-4">
          <span>
            ¿Estás seguro que quieres eliminar este usuario: <b>{email}</b>?
          </span>
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
            className={`btn btn-danger ${cargando ? " disabled" : ""}`}
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

            {cargando ? "Eliminando..." : "Eliminar"}
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default EliminarUsuarioModalBody;
