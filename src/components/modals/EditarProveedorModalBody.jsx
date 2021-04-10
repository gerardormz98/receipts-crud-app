import React, { Component } from "react";
import ProveedorService from "../../services/ProveedorService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIdCard, faPhone } from "@fortawesome/free-solid-svg-icons";
import $ from "jquery";
import Validations from "../../validations";
import { DEFAULT_ERROR } from "../../constants";
import FormErrors from "../FormErrors";

class EditarProveedorModalBody extends Component {
  state = {
    name: "",
    phone: "",
    formErrors: [],
    cargando: false
  };

  handleNombreChange = e => {
    this.setState({
      name: e.target.value
    });
  };

  handleTelefonoChange = e => {
    if (e.target.value.length <= 10) {
      this.setState({
        phone: e.target.value
      });
    }
  };

  handleConfirmarClick = e => {
    if (this.formValid()) {
      this.setState({ cargando: true });

      const { supplierID } = this.props.proveedor;
      const { name, phone } = this.state;

      ProveedorService.putProveedor(supplierID, name, phone)
        .then(res => {
          if (res.status === 200) {
            this.props.onProveedorEdited();
            $("#editarProveedorModal").modal("hide");
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

    if (!Validations.required(this.state.name))
      formErrors.push({
        field: "Nombre",
        error: "El nombre es requerido."
      });

    if (!Validations.required(this.state.phone))
      formErrors.push({
        field: "Telefono",
        error: "El teléfono es requerido."
      });

    this.setState({ formErrors });
    return formErrors.length === 0;
  }

  componentDidUpdate(prevProps) {
    if (this.props.proveedor !== prevProps.proveedor) {
      this.setState({
        name: this.props.proveedor.name,
        phone: this.props.proveedor.phone
      });
    }
  }

  render() {
    const { name, phone, formErrors, cargando } = this.state;

    return (
      <React.Fragment>
        <div className="modal-body p-4">
          <FormErrors errors={formErrors} />

          <div className="input-group mb-2">
            <div className="input-group-prepend">
              <div className="input-group-text">
                <FontAwesomeIcon icon={faIdCard} />
              </div>
            </div>
            <input
              type="text"
              className={`form-control ${
                formErrors.some(e => e.field === "Nombre") ? "is-invalid" : ""
              }`}
              value={name}
              placeholder="Nombre"
              onChange={this.handleNombreChange}
            />
          </div>

          <div className="input-group mb-2">
            <div className="input-group-prepend">
              <div className="input-group-text">
                <FontAwesomeIcon icon={faPhone} />
              </div>
            </div>
            <input
              type="text"
              className={`form-control ${
                formErrors.some(e => e.field === "Telefono") ? "is-invalid" : ""
              }`}
              value={phone.trim()}
              placeholder="Teléfono"
              onChange={this.handleTelefonoChange}
            />
          </div>
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

export default EditarProveedorModalBody;