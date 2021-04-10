import React, { Component } from "react";
import RecibosService from "./../../services/RecibosService";
import { DEFAULT_ERROR } from "../../constants";
import $ from "jquery";

class EliminarReciboModalBody extends Component {
  state = { cargando: false };

  handleConfirmarClick = e => {
    this.setState({ cargando: true });

    RecibosService.deleteRecibo(this.props.recibo.receiptID)
      .then(res => {
        if (res.status === 204) {
          this.props.onReciboDeleted();
          $("#eliminarReciboModal").modal("hide");
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
    const { cargando } = this.state;
    const { receiptID } = this.props.recibo;

    return (
      <React.Fragment>
        <div className="modal-body p-4">
          <span>
            ¿Estás seguro que quieres eliminar el recibo #<b>{receiptID}</b>?
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

export default EliminarReciboModalBody;
