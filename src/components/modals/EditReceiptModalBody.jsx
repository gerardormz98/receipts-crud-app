import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import Validations from "../../utils/validations";
import FormErrors from "../FormErrors";
import SupplierDropdown from "../SupplierDropdown";
import ReceiptsService from "../../services/ReceiptsService";
import { DEFAULT_ERROR } from "../../utils/constants";
import $ from "jquery";

class EditReceiptModalBody extends Component {
  state = {
    amount: "",
    comments: "",
    supplier: "",
    formErrors: [],
    loading: false
  };

  handleAmountChange = e => {
    this.setState({
      amount: e.target.value
    });
  };

  handleCommentsChange = e => {
    this.setState({
      comments: e.target.value
    });
  };

  handleSupplierChange = e => {
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

  handleConfirmClick = e => {
    if (this.formValid()) {
      this.setState({ loading: true });

      const { supplier, amount, comments } = this.state;
      const { receiptID } = this.props.receipt;

      ReceiptsService.putReceipt(receiptID, supplier, amount, comments)
        .then(res => {
          if (res.status === 200) {
            this.props.onReceiptEdited();
            this.cleanFields();
            $("#editReceiptModal").modal("hide");
          }
        })
        .catch(err => {
          alert(DEFAULT_ERROR);
        })
        .finally(() => {
          this.setState({ loading: false });
        });
    }
  };

  formValid() {
    let formErrors = [];

    if (!Validations.required(this.state.amount))
      formErrors.push({
        field: "Amount",
        error: "The amount is required."
      });
    else if (!Validations.numeric(this.state.amount))
      formErrors.push({
        field: "Amount",
        error: "Please enter a numeric amount."
      });
    else if (this.state.amount < 1) {
      formErrors.push({
        field: "Amount",
        error: "Amount should be greater than 0."
      });
    }
    
    if (!Validations.required(this.state.supplier))
      formErrors.push({
        field: "Supplier",
        error: "You must choose a supplier."
      });

    if (!Validations.required(this.state.comments))
      formErrors.push({
        field: "Comments",
        error: "A comment is required."
      });

    this.setState({ formErrors });
    return formErrors.length === 0;
  }

  componentDidUpdate(prevProps) {
    if (this.props.receipt !== prevProps.receipt) {
      this.setState({
        amount: this.props.receipt.amount,
        comments: this.props.receipt.comments,
        supplier: this.props.receipt.supplier.supplierID
      });
    }
  }

  render() {
    const { formErrors, amount, comments, loading } = this.state;

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
              type="number"
              className={`form-control ${
                formErrors.some(e => e.field === "Amount") ? "is-invalid" : ""
              }`}
              value={amount}
              placeholder="Amount"
              onChange={this.handleAmountChange}
            />
          </div>

          <SupplierDropdown
            supplierID={this.state.supplier}
            onSupplierChange={this.handleSupplierChange}
            onLoadValues={this.handleSupplierChange}
            hasErrors={formErrors.some(e => e.field === "Supplier")}
          />

          <textarea
            className={`form-control ${
              formErrors.some(e => e.field === "Comments") ? "is-invalid" : ""
            }`}
            rows="4"
            placeholder="Comments..."
            value={comments}
            onChange={this.handleCommentsChange}
          ></textarea>
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
            className={`btn btn-info ${loading ? " disabled" : ""}`}
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

            {loading ? "Editing..." : "Edit"}
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default EditReceiptModalBody;
