import React, { Component } from "react";
import SupplierService from "../../services/SupplierService";
import { DEFAULT_ERROR } from "../../utils/constants";
import $ from "jquery";

class DeleteSupplierModalBody extends Component {
  state = { loading: false };

  handleConfirmClick = e => {
    this.setState({ loading: true });

    SupplierService.deleteSupplier(this.props.supplier.supplierID)
      .then(res => {
        if (res.status === 204) {
          this.props.onSupplierDeleted();
          $("#deleteSupplierModal").modal("hide");
        }
      })
      .catch(err => {
        alert(DEFAULT_ERROR);
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  render() {
    const { loading } = this.state;
    const { name } = this.props.supplier;

    return (
      <React.Fragment>
        <div className="modal-body p-4">
          <span>
            WARNING: Deleting this supplier will remove all the receipts linked to this supplier ID.
            Are you sure you want to delete the supplier: <b>{name}</b>?
          </span>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            data-dismiss="modal"
          >
            Close
          </button>
          <button
            type="button"
            className={`btn btn-danger ${loading ? " disabled" : ""}`}
            onClick={this.handleConfirmClick}
          >
            {loading ? (
              <span
                className="spinner-border spinner-border-sm mr-2"
                style={{ marginBottom: 2 }}
                role="status"
              ></span>
            ) : (
              ""
            )}

            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default DeleteSupplierModalBody;
