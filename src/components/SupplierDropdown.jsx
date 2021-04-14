import React, { Component } from "react";
import { DEFAULT_ERROR } from "../utils/constants";
import SupplierService from "../services/SupplierService";

class SupplierDropdown extends Component {
  state = {
    suppliers: []
  };

  componentDidMount() {
    SupplierService.getSuppliers()
      .then(res => {
        if (res.status === 200) {
          this.setState({ suppliers: res.data });

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
      !this.state.suppliers.some(p => p.supplierID === parseInt(this.props.supplierID))
    ) {
      this.props.onLoadValues(
        this.state.suppliers[0] ? this.state.suppliers[0].supplierID : ""
      );
    }
  }

  render() {
    return (
      <div className="d-flex align-items-center mb-2">
        <span className="mr-2 text-secondary">Supplier:</span>
        <select
          value={this.props.supplierID}
          className={`form-control  ${
            this.props.hasErrors ? "is-invalid" : ""
          }`}
          onChange={this.props.onSupplierChange}
        >
          {this.state.suppliers.map(p => (
            <option key={p.supplierID} value={p.supplierID}>
              {p.name}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

export default SupplierDropdown;
