import React, { Component } from "react";
import ReceiptsService from "../../services/ReceiptsService";
import { DEFAULT_ERROR } from "../../utils/constants";
import $ from "jquery";

class DeleteReceiptModalBody extends Component {
  state = { loading: false };

  handleConfirmClick = e => {
    this.setState({ loading: true });

    ReceiptsService.deleteReceipt(this.props.receipt.receiptID)
      .then(res => {
        if (res.status === 204) {
          this.props.onReceiptDeleted();
          $("#deleteReceiptModal").modal("hide");
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
    const { receiptID } = this.props.receipt;

    return (
      <React.Fragment>
        <div className="modal-body p-4">
          <span>
            Are you sure you want to delete the receipt #<b>{receiptID}</b>?
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

export default DeleteReceiptModalBody;
