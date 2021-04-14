import React, { Component } from "react";
import { MDBDataTable } from "mdbreact";
import SupplierService from "../services/SupplierService";
import Modal from "./modals/Modal";
import EditSupplierModalBody from "./modals/EditSupplierModalBody";
import DeleteSupplierModalBody from "./modals/DeleteSupplierModalBody";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencilAlt,
  faTrash,
  faPlus
} from "@fortawesome/free-solid-svg-icons";
import NewSupplierModalBody from "./modals/NewSupplierModalBody";

class Suppliers extends Component {
  state = {
    selectedSupplier: {
      supplierID: 0,
      name: "",
      phone: ""
    },
    data: {},
    loading: false
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
            label: "Name",
            field: "name",
            sort: "asc"
          },
          {
            label: "Phone",
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

  addSelectedSupplierToState = prov => {
    const { supplierID, name, phone } = prov;
    this.setState({
      selectedSupplier: { supplierID, name, phone }
    });
  };

  processRows(rows) {
    rows.forEach(r => {
      r.actions = (
        <div className="d-flex justify-content-center">
          <button
            type="button"
            data-toggle="modal"
            data-target="#editSupplierModal"
            style={{ width: 27, height: 27 }}
            className="btn btn-info btn-small p-0 w-0 mr-2"
            onClick={() => this.addSelectedSupplierToState(r)}
          >
            <FontAwesomeIcon icon={faPencilAlt} size="sm" />
          </button>
          <button
            type="button"
            data-toggle="modal"
            data-target="#deleteSupplierModal"
            style={{ width: 27, height: 27 }}
            className="btn btn-danger btn-small p-0 w-0"
            onClick={() => this.addSelectedSupplierToState(r)}
          >
            <FontAwesomeIcon icon={faTrash} size="sm" />
          </button>
        </div>
      );
    });

    return rows;
  }

  refreshSuppliers = (mostrarAnimacion = false) => {
    if (mostrarAnimacion) this.setState({ loading: true });

    SupplierService.getSuppliers()
      .then(res => {
        if (res.status === 200) {
          this.setState({ loading: false });
          this.addRowsToState(res.data);
        }
      })
      .catch(err => {});
  };

  componentDidMount() {
    this.refreshSuppliers(true);
  }

  render() {
    return (
      <React.Fragment>
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h5>Suppliers</h5>
          <button
            className="btn btn-success btn-sm"
            data-toggle="modal"
            data-target="#newSupplierModal"
          >
            <FontAwesomeIcon icon={faPlus} /> Add
          </button>
        </div>

        {this.state.loading ? (
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
          />
        )}

        <Modal
          modalId="newSupplierModal"
          modalTitle="Add supplier"
          modalBody={
            <NewSupplierModalBody
              onSupplierAdded={this.refreshSuppliers}
            />
          }
        />

        <Modal
          modalId="editSupplierModal"
          modalTitle="Edit supplier"
          modalBody={
            <EditSupplierModalBody
              supplier={this.state.selectedSupplier}
              onSupplierEdited={this.refreshSuppliers}
            />
          }
        />

        <Modal
          modalId="deleteSupplierModal"
          modalTitle="Delete supplier"
          modalBody={
            <DeleteSupplierModalBody
              supplier={this.state.selectedSupplier}
              onSupplierDeleted={this.refreshSuppliers}
            />
          }
        />
      </React.Fragment>
    );
  }
}

export default Suppliers;
