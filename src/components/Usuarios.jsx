import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faPencilAlt,
  faTrash,
  faUsers
} from "@fortawesome/free-solid-svg-icons";
import { MDBDataTable } from "mdbreact";
import AuthService from "./../services/AuthService";
import Modal from "./modals/Modal";
import UsuarioService from "./../services/UsuarioService";
import NuevoUsuarioModalBody from "./modals/NuevoUsuarioModalBody";
import EliminarUsuarioModalBody from "./modals/EliminarUsuarioModalBody";
import EditarUsuarioModalBody from "./modals/EditarUsuarioModalBody";

class Usuarios extends Component {
  state = {
    data: {},
    usuarioSeleccionado: {},
    cargando: false
  };

  addRowsToState(rows) {
    this.setState({
      data: {
        columns: [
          {
            label: "ID",
            field: "userID",
            sort: "asc"
          },
          {
            label: "Correo",
            field: "email",
            sort: "asc"
          },
          {
            label: "Administrador",
            field: "isAdmin",
            sort: "asc"
          },
          {
            label: "",
            field: "actions",
            sort: "asc"
          }
        ],
        rows: this.processRows(rows)
      }
    });
  }

  addSelectedUserToState = user => {
    const { userID, email, isAdmin } = user;
    this.setState({
      usuarioSeleccionado: { userID, email, isAdmin: isAdmin === "Sí" }
    });
  };

  processRows(rows) {
    rows.forEach(r => {
      r.actions = (
        <div className="d-flex justify-content-center">
          <button
            type="button"
            data-toggle="modal"
            data-target="#editarUsuarioModal"
            style={{ width: 27, height: 27 }}
            className="btn btn-info btn-small p-0 w-0 mr-2"
            onClick={() => this.addSelectedUserToState(r)}
          >
            <FontAwesomeIcon icon={faPencilAlt} size="sm" />
          </button>
          <button
            type="button"
            data-toggle="modal"
            data-target="#eliminarUsuarioModal"
            style={{ width: 27, height: 27 }}
            className="btn btn-danger btn-small p-0 w-0"
            onClick={() => this.addSelectedUserToState(r)}
          >
            <FontAwesomeIcon icon={faTrash} size="sm" />
          </button>
        </div>
      );
      r.isAdmin = r.isAdmin ? "Sí" : "No";
    });

    return rows;
  }

  refreshUsuarios = (mostrarAnimacion = false) => {
    if (mostrarAnimacion) this.setState({ cargando: true });

    UsuarioService.getUsuarios()
      .then(res => {
        if (res.status === 200) {
          this.setState({ cargando: false });
          this.addRowsToState(res.data);
        }
      })
      .catch(err => {});
  };

  componentDidMount() {
    const user = AuthService.getUserInfo();
    if (!user.isAdmin) this.props.history.push("/recibos");
    else this.refreshUsuarios(true);
  }

  render() {
    return (
      <React.Fragment>
        <div className="w-100 d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <FontAwesomeIcon
              icon={faUsers}
              size="2x"
              style={{ color: "#343a40" }}
            />
            <h3 className="mb-0 ml-3">Usuarios</h3>
          </div>
          <button
            className="btn btn-success"
            data-toggle="modal"
            data-target="#nuevoUsuarioModal"
          >
            <FontAwesomeIcon icon={faPlus} /> Agregar
          </button>
        </div>

        <hr />

        {this.state.cargando ? (
          <div className="w-100 d-flex justify-content-center mt-5">
            <div
              className="spinner-border text-primary"
              style={{ width: 50, height: 50 }}
              role="status"
            ></div>
          </div>
        ) : (
          <MDBDataTable
            striped
            bordered
            hover
            responsive
            data={this.state.data}
            noRecordsFoundLabel="No se encontraron registros."
            infoLabel={["Mostrando", "a", "de", "resultados"]}
            paginationLabel={["Anterior", "Siguiente"]}
          />
        )}

        <Modal
          modalId="nuevoUsuarioModal"
          modalTitle="Agregar nuevo usuario"
          modalBody={
            <NuevoUsuarioModalBody onUsuarioAdded={this.refreshUsuarios} />
          }
        />

        <Modal
          modalId="editarUsuarioModal"
          modalTitle="Editar usuario"
          modalBody={
            <EditarUsuarioModalBody
              usuario={this.state.usuarioSeleccionado}
              onUsuarioEdited={this.refreshUsuarios}
            />
          }
        />

        <Modal
          modalId="eliminarUsuarioModal"
          modalTitle="Eliminar usuario"
          modalBody={
            <EliminarUsuarioModalBody
              usuario={this.state.usuarioSeleccionado}
              onUsuarioDeleted={this.refreshUsuarios}
            />
          }
        />
      </React.Fragment>
    );
  }
}

export default Usuarios;
