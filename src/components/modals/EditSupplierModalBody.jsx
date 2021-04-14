import React, { Component } from "react";
import SupplierService from "../../services/SupplierService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIdCard, faPhone } from "@fortawesome/free-solid-svg-icons";
import $ from "jquery";
import Validations from "../../utils/validations";
import { DEFAULT_ERROR } from "../../utils/constants";
import FormErrors from "../FormErrors";

class EditSupplierModalBody extends Component {
  state = {
    name: "",
    phone: "",
    formErrors: [],
    loading: false
  };

  handleNameChange = e => {
    this.setState({
      name: e.target.value
    });
  };

  handlePhoneChange = e => {
    if (e.target.value.length <= 10) {
      this.setState({
        phone: e.target.value
      });
    }
  };

  handleConfirmClick = e => {
    if (this.formValid()) {
      this.setState({ loading: true });

      const { supplierID } = this.props.supplier;
      const { name, phone } = this.state;

      SupplierService.putSupplier(supplierID, name, phone)
        .then(res => {
          if (res.status === 200) {
            this.props.onSupplierEdited();
            $("#editSupplierModal").modal("hide");
          }
        })
        .catch(err => {
          let message = DEFAULT_ERROR;
          if (err.response.data.message) message = err.response.data.message;

          alert(message);
        })
        .finally(() => {
          this.setState({ loading: false });
        });
    }
  };

  formValid() {
    let formErrors = [];

    if (!Validations.required(this.state.name))
      formErrors.push({
        field: "Name",
        error: "The name is required."
      });

    if (!Validations.required(this.state.phone))
      formErrors.push({
        field: "Phone",
        error: "The phone is required."
      });

    this.setState({ formErrors });
    return formErrors.length === 0;
  }

  componentDidUpdate(prevProps) {
    if (this.props.supplier !== prevProps.supplier) {
      this.setState({
        name: this.props.supplier.name,
        phone: this.props.supplier.phone
      });
    }
  }

  render() {
    const { name, phone, formErrors, loading } = this.state;

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
              placeholder="Name"
              onChange={this.handleNameChange}
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
              placeholder="Phone"
              onChange={this.handlePhoneChange}
            />
          </div>
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

export default EditSupplierModalBody;
