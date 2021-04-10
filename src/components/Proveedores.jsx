import React, { Component } from "react";
import { MDBDataTable } from "mdbreact";
import ProveedorService from "./../services/ProveedorService";
import Modal from "./modals/Modal";
import EditarProveedorModalBody from "./modals/EditarProveedorModalBody";
import EliminarProveedorModalBody from "./modals/EliminarProveedorModalBody";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencilAlt,
  faTrash,
  faPlus
} from "@fortawesome/free-solid-svg-icons";
import NuevoProveedorModalBody from "./modals/NuevoProveedorModalBody";

class Proveedores extends Component {
  state = {
    proveedorSeleccionado: {
      supplierID: 0,
      name: "",
      phone: ""
    },
    data: {},
    cargando: false
  };

  addRowsToState(rows) {
    this.setState({
      data: {
        columns: [
          {
            label: "ID",
            field: "supplierID",
            sort: "asc"
          },
          {
            label: "Nombre",
            field: "name",
            sort: "asc"
          },
          {
            label: "Teléfono",
            field: "phone",
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

  addSelectedProveedorToState = prov => {
    const { supplierID, name, phone } = prov;
    this.setState({
      proveedorSeleccionado: { supplierID, name, phone }
    });
  };

  processRows(rows) {
    rows.forEach(r => {
      r.actions = (
        <div className="d-flex justify-content-center">
          <button
            type="button"
            data-toggle="modal"
            data-target="#editarProveedorModal"
            style={{ width: 27, height: 27 }}
            className="btn btn-info btn-small p-0 w-0 mr-2"
            onClick={() => this.addSelectedProveedorToState(r)}
          >
            <FontAwesomeIcon icon={faPencilAlt} size="sm" />
          </button>
          <button
            type="button"
            data-toggle="modal"
            data-target="#eliminarProveedorModal"
            style={{ width: 27, height: 27 }}
            className="btn btn-danger btn-small p-0 w-0"
            onClick={() => this.addSelectedProveedorToState(r)}
          >
            <FontAwesomeIcon icon={faTrash} size="sm" />
          </button>
        </div>
      );
    });

    return rows;
  }

  refreshProveedores = (mostrarAnimacion = false) => {
    if (mostrarAnimacion) this.setState({ cargando: true });

    ProveedorService.getProveedores()
      .then(res => {
        if (res.status === 200) {
          this.setState({ cargando: false });
          this.addRowsToState(res.data);
        }
      })
      .catch(err => {});
  };

  componentDidMount() {
    this.refreshProveedores(true);
  }

  render() {
    return (
      <React.Fragment>
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h5>Proveedores</h5>
          <button
            className="btn btn-success btn-sm"
            data-toggle="modal"
            data-target="#nuevoProveedorModal"
          >
            <FontAwesomeIcon icon={faPlus} /> Agregar
          </button>
        </div>

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
          modalId="nuevoProveedorModal"
          modalTitle="Añadir proveedor"
          modalBody={
            <NuevoProveedorModalBody
              onProveedorAdded={this.refreshProveedores}
            />
          }
        />

        <Modal
          modalId="editarProveedorModal"
          modalTitle="Editar proveedor"
          modalBody={
            <EditarProveedorModalBody
              proveedor={this.state.proveedorSeleccionado}
              onProveedorEdited={this.refreshProveedores}
            />
          }
        />

        <Modal
          modalId="eliminarProveedorModal"
          modalTitle="Eliminar proveedor"
          modalBody={
            <EliminarProveedorModalBody
              proveedor={this.state.proveedorSeleccionado}
              onProveedorDeleted={this.refreshProveedores}
            />
          }
        />
      </React.Fragment>
    );
  }
}

export default Proveedores;
