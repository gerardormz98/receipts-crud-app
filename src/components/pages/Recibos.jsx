import React, { Component } from "react";
import { MDBDataTable } from "mdbreact";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faPencilAlt,
  faTrash,
  faReceipt
} from "@fortawesome/free-solid-svg-icons";
import RecibosService from "./../../services/RecibosService";
import Modal from "./../modals/Modal";
import NuevoReciboModalBody from "./../modals/NuevoReciboModalBody";
import EditarReciboModalBody from "./../modals/EditarReciboModalBody";
import EliminarReciboModalBody from "./../modals/EliminarReciboModalBody";
import moment from "moment";

class Recibos extends Component {
  state = {
    data: {},
    reciboSeleccionado: {},
    cargando: false
  };

  addRowsToState(rows) {
    this.setState({
      data: {
        columns: [
          {
            label: "No. de recibo",
            field: "receiptID",
            sort: "desc"
          },
          {
            label: "Monto",
            field: "amount",
            sort: "asc"
          },
          {
            label: "Proveedor",
            field: "supplierName",
            sort: "asc"
          },
          {
            label: "Fecha",
            field: "date",
            sort: "asc"
          },
          {
            label: "Comentario",
            field: "comments",
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

  addSelectedReciboToState = recibo => {
    const { receiptID, amount, supplier, date, comments } = recibo;
    this.setState({
      reciboSeleccionado: {
        receiptID,
        amount,
        supplier,
        date,
        comments
      }
    });
  };

  processRows(rows) {
    rows.forEach(r => {
      r.date = moment(r.date).format("lll");
      r.supplierName = r.supplier.name;
      r.actions = (
        <div className="d-flex justify-content-center">
          <button
            type="button"
            data-toggle="modal"
            data-target="#editarReciboModal"
            style={{ width: 27, height: 27 }}
            className="btn btn-info btn-small p-0 w-0 mr-2"
            onClick={() => this.addSelectedReciboToState(r)}
          >
            <FontAwesomeIcon icon={faPencilAlt} size="sm" />
          </button>
          <button
            type="button"
            data-toggle="modal"
            data-target="#eliminarReciboModal"
            style={{ width: 27, height: 27 }}
            className="btn btn-danger btn-small p-0 w-0"
            onClick={() => this.addSelectedReciboToState(r)}
          >
            <FontAwesomeIcon icon={faTrash} size="sm" />
          </button>
        </div>
      );
    });

    return rows;
  }

  refreshRecibos = (mostrarAnimacion = false) => {
    if (mostrarAnimacion) this.setState({ cargando: true });

    RecibosService.getRecibos()
      .then(res => {
        if (res.status === 200) {
          this.setState({ cargando: false });
          this.addRowsToState(res.data);
        }
      })
      .catch(err => {});
  };

  componentDidMount() {
    this.refreshRecibos(true);
  }

  render() {
    return (
      <React.Fragment>
        <div className="w-100 d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <FontAwesomeIcon
              icon={faReceipt}
              size="2x"
              style={{ color: "#343a40" }}
            />
            <h3 className="mb-0 ml-3">Mis recibos</h3>
          </div>
          <button
            className="btn btn-success"
            data-toggle="modal"
            data-target="#nuevoReciboModal"
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
            order={["idRecibo", "desc"]}
          />
        )}

        <Modal
          modalId="nuevoReciboModal"
          modalTitle="Agregar nuevo recibo"
          modalBody={
            <NuevoReciboModalBody onReciboAdded={this.refreshRecibos} />
          }
        />

        <Modal
          modalId="editarReciboModal"
          modalTitle={`Editar recibo #${this.state.reciboSeleccionado.idRecibo}`}
          modalBody={
            <EditarReciboModalBody
              recibo={this.state.reciboSeleccionado}
              onReciboEdited={this.refreshRecibos}
            />
          }
        />

        <Modal
          modalId="eliminarReciboModal"
          modalTitle="Eliminar recibo"
          modalBody={
            <EliminarReciboModalBody
              recibo={this.state.reciboSeleccionado}
              onReciboDeleted={this.refreshRecibos}
            />
          }
        />
      </React.Fragment>
    );
  }
}

export default Recibos;
