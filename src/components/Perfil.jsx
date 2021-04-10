import React, { Component } from "react";
import AuthService from "./../services/AuthService";
import CambiarPasswordModalBody from "./modals/CambiarPasswordModalBody";
import Modal from "./modals/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

class Perfil extends Component {
  state = {
    usuario: {
      isAdmin: false,
      email: ""
    },
    mensaje: ""
  };

  componentDidMount() {
    const usuario = AuthService.getUserInfo();
    this.setState({ usuario });
  }

  handlePasswordSent = () => {
    this.setState({
      mensaje:
        "Se te ha enviado un correo con las instrucciones para el cambio de contraseña. Por favor, revisa tu bandeja de entrada."
    });
  };

  render() {
    const { isAdmin, email } = this.state.usuario;

    return (
      <React.Fragment>
        <div className="d-flex align-items-center">
          <FontAwesomeIcon
            icon={faUserCircle}
            size="2x"
            style={{ color: "#343a40" }}
          />
          <h3 className="mb-0 ml-3">Mi perfil</h3>
        </div>
        <hr />

        <div className="mb-3">
          <span>Rol actual: </span>
          <span
            className={`badge badge-${isAdmin ? "success" : "primary"} ml-3`}
          >
            {isAdmin ? "Administrador" : "Usuario"}
          </span>
        </div>

        <div className="d-flex align-items-center mb-3">
          <span className="align-middle">Usuario: </span>
          <div className="input-group ml-3">
            <div className="input-group-prepend">
              <div className="input-group-text">@</div>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="Correo"
              value={email}
              readOnly
            />
          </div>
        </div>

        <input
          type="button"
          className="btn btn-sm btn-danger"
          value="Cambiar contraseña"
          data-toggle="modal"
          data-target="#cambiarPasswordModal"
        ></input>

        <p className="mt-3">{this.state.mensaje}</p>

        <Modal
          modalId="cambiarPasswordModal"
          modalTitle="Cambiar contraseña"
          modalBody={
            <CambiarPasswordModalBody
              onPasswordSent={this.handlePasswordSent}
              usuario={this.state.usuario}
            />
          }
        />
      </React.Fragment>
    );
  }
}

export default Perfil;
