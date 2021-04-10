import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import Validations from "../../utils/validations";
import FormErrors from "./../FormErrors";
import ProveedorDropdown from "./../ProveedorDropdown";
import RecibosService from "./../../services/RecibosService";
import { DEFAULT_ERROR } from "../../utils/constants";
import $ from "jquery";

class NuevoReciboModalBody extends Component {
  state = {
    amount: "",
    comments: "",
    supplier: "",
    formErrors: [],
    cargando: false
  };

  handleMontoChange = e => {
    this.setState({
      amount: e.target.value
    });
  };

  handleComentarioChange = e => {
    this.setState({
      comments: e.target.value
    });
  };

  handleProveedorChange = e => {
    let value = "";

    if (typeof e === "number" || typeof e === "string") value = e;
    else value = e.target.value;

    this.setState({
      supplier: value
    });
  };

  cleanFields = () => {
    this.setState({ amount: "", comments: "" });
  };

  handleConfirmarClick = e => {
    if (this.formValid()) {
      this.setState({ cargando: true });

      const { supplier, amount, comments } = this.state;

      RecibosService.postRecibo(supplier, amount, comments)
        .then(res => {
          if (res.status === 201) {
            this.props.onReciboAdded();
            this.cleanFields();
            $("#nuevoReciboModal").modal("hide");
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

  formValid() {
    let formErrors = [];

    if (!Validations.required(this.state.amount))
      formErrors.push({
        field: "Monto",
        error: "El monto es requerido."
      });
    else if (!Validations.numeric(this.state.amount))
      formErrors.push({
        field: "Monto",
        error: "Introduce un monto numérico."
      });

    if (!Validations.required(this.state.supplier))
      formErrors.push({
        field: "Proveedor",
        error: "Debes elegir un proveedor."
      });

    if (!Validations.required(this.state.comments))
      formErrors.push({
        field: "Comentario",
        error: "El comentario es requerido."
      });

    this.setState({ formErrors });
    return formErrors.length === 0;
  }

  render() {
    const { formErrors, amount, comments, cargando } = this.state;

    return (
      <React.Fragment>
        <div className="modal-body p-4">
          <FormErrors errors={formErrors} />
          <div className="input-group mb-2">
            <div className="input-group-prepend">
              <div className="input-group-text">
                <FontAwesomeIcon icon={faCoins} />
              </div>
            </div>
            <input
              type="text"
              className={`form-control ${
                formErrors.some(e => e.field === "Monto") ? "is-invalid" : ""
              }`}
              value={amount}
              placeholder="Monto"
              onChange={this.handleMontoChange}
            />
          </div>

          <ProveedorDropdown
            onProveedorChange={this.handleProveedorChange}
            onLoadValues={this.handleProveedorChange}
            hasErrors={formErrors.some(e => e.field === "Proveedor")}
          />

          <textarea
            className={`form-control ${
              formErrors.some(e => e.field === "Comentario") ? "is-invalid" : ""
            }`}
            rows="4"
            placeholder="Comentario..."
            value={comments}
            onChange={this.handleComentarioChange}
          ></textarea>
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
