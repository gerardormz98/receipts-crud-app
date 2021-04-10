import React, { Component } from "react";
import { DEFAULT_ERROR } from "./../constants";
import ProveedorService from "./../services/ProveedorService";

class ProveedorDropdown extends Component {
  state = {
    proveedores: []
  };

  componentDidMount() {
    ProveedorService.getProveedores()
      .then(res => {
        if (res.status === 200) {
          this.setState({ proveedores: res.data });

          if (res.data[0]) this.props.onLoadValues(res.data[0].supplierID);
          else this.props.onLoadValues("");
        }
      })
      .catch(err => {
        alert(DEFAULT_ERROR + " " + err);
      });
  }

  componentDidUpdate() {
    if (
      this.props.supplierID &&
      !this.state.proveedores.some(p => p.supplierID === this.props.supplierID)
    ) {
      this.props.onLoadValues(
        this.state.proveedores[0] ? this.state.proveedores[0].supplierID : ""
      );
    }
  }

  render() {
    return (
      <div className="d-flex align-items-center mb-2">
        <span className="mr-2 text-secondary">Proveedor:</span>
        <select
          value={this.props.supplierID}
          className={`form-control  ${
            this.props.hasErrors ? "is-invalid" : ""
          }`}
          onChange={this.props.onProveedorChange}
        >
          {this.state.proveedores.map(p => (
            <option key={p.supplierID} value={p.supplierID}>
              {p.name}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

export default ProveedorDropdown;
