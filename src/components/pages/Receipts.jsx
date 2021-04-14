import React, { Component } from "react";
import { MDBDataTable } from "mdbreact";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faPencilAlt,
  faTrash,
  faReceipt
} from "@fortawesome/free-solid-svg-icons";
import ReceiptsService from "../../services/ReceiptsService";
import Modal from "../modals/Modal";
import NewReceiptModalBody from "../modals/NewReceiptModalBody";
import EditReceiptModalBody from "../modals/EditReceiptModalBody";
import DeleteReceiptModalBody from "../modals/DeleteReceiptModalBody";
import moment from "moment";

class Receipts extends Component {
  state = {
    data: {},
    selectedReceipt: {},
    loading: false
  };

  addRowsToState(rows) {
    this.setState({
      data: {
        columns: [
          {
            label: "Receipt No.",
            field: "receiptID",
            sort: "desc"
          },
          {
            label: "Amount",
            field: "amount",
            sort: "asc"
          },
          {
            label: "Supplier",
            field: "supplierName",
            sort: "asc"
          },
          {
            label: "Date",
            field: "date",
            sort: "asc"
          },
          {
            label: "Comments",
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

  addSelectedReceiptToState = receipt => {
    const { receiptID, amount, supplier, date, comments } = receipt;
    this.setState({
      selectedReceipt: {
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
            data-target="#editReceiptModal"
            style={{ width: 27, height: 27 }}
            className="btn btn-info btn-small p-0 w-0 mr-2"
            onClick={() => this.addSelectedReceiptToState(r)}
          >
            <FontAwesomeIcon icon={faPencilAlt} size="sm" />
          </button>
          <button
            type="button"
            data-toggle="modal"
            data-target="#deleteReceiptModal"
            style={{ width: 27, height: 27 }}
            className="btn btn-danger btn-small p-0 w-0"
            onClick={() => this.addSelectedReceiptToState(r)}
          >
            <FontAwesomeIcon icon={faTrash} size="sm" />
          </button>
        </div>
      );
    });

    return rows;
  }

  refreshReceipts = (showAnimation = false) => {
    if (showAnimation) this.setState({ loading: true });

    ReceiptsService.getReceipts()
      .then(res => {
        if (res.status === 200) {
          this.setState({ loading: false });
          this.addRowsToState(res.data);
        }
      })
      .catch(err => {});
  };

  componentDidMount() {
    this.refreshReceipts(true);
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
            <h3 className="mb-0 ml-3">My receipts</h3>
          </div>
          <button
            className="btn btn-success"
            data-toggle="modal"
            data-target="#newReceiptModal"
          >
            <FontAwesomeIcon icon={faPlus} /> Add
          </button>
        </div>

        <hr />

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
            order={["receiptID", "desc"]}
          />
        )}

        <Modal
          modalId="newReceiptModal"
          modalTitle="Add new receipt"
          modalBody={
            <NewReceiptModalBody onReceiptAdded={this.refreshReceipts} />
          }
        />

        <Modal
          modalId="editReceiptModal"
          modalTitle={`Edit receipt #${this.state.selectedReceipt.receiptID}`}
          modalBody={
            <EditReceiptModalBody
              receipt={this.state.selectedReceipt}
              onReceiptEdited={this.refreshReceipts}
            />
          }
        />

        <Modal
          modalId="deleteReceiptModal"
          modalTitle="Delete receipt"
          modalBody={
            <DeleteReceiptModalBody
              receipt={this.state.selectedReceipt}
              onReceiptDeleted={this.refreshReceipts}
            />
          }
        />
      </React.Fragment>
    );
  }
}

export default Receipts;
