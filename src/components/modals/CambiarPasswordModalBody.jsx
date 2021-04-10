import React, { Component } from "react";
import AuthService from "../../services/AuthService";
import { DEFAULT_ERROR } from "../../constants";
import $ from "jquery";

class CambiarPasswordModalBody extends Component {
  state = { cargando: false };

  handleConfirmarClick = e => {
    this.setState({ cargando: true });

    AuthService.resetPassword(this.props.usuario.email)
      .then(res => {
        if (res.status === 200) {
          this.props.onPasswordSent();
          $("#cambiarPasswordModal").modal("hide");
        }
      })
      .catch(err => {
        alert(DEFAULT_ERROR);
      })
      .finally(() => {
        this.setState({ cargando: false });
      });
  };

  render() {
    const { usuario } = this.props;
    const { cargando } = this.state;

    return (
      <React.Fragment>
        <div className="modal-body p-4">
          <span>
            Para cambiar tu contraseña, se te enviará un correo a{" "}
            <b>{usuario.email}</b> ¿Estás seguro de que quieres cambiar tu
            contraseña?
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

            {cargando ? "Enviando..." : "Confirmar"}
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default CambiarPasswordModalBody;
