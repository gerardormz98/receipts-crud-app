import React, { Component } from "react";
import Suppliers from "../Suppliers";
import AuthService from "../../services/AuthService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListAlt } from "@fortawesome/free-solid-svg-icons";

class Catalogs extends Component {
  state = {
    currentCatalog: "Suppliers"
  };

  handleCatalogChange = e => {
    this.setState({ currentCatalog: e.target.value });
  };

  renderCurrentCatalog() {
    const { currentCatalog } = this.state;

    if (currentCatalog === "Suppliers") {
      return <Suppliers />;
    }
  }

  componentDidMount() {
    const user = AuthService.getUserInfo();
    if (!user.isAdmin) this.props.history.push("/receipts");
  }

  render() {
    return (
      <React.Fragment>
        <div className="d-flex align-items-center">
          <FontAwesomeIcon
            icon={faListAlt}
            size="2x"
            style={{ color: "#343a40" }}
          />
          <h3 className="mb-0 ml-3">Catalogs</h3>
        </div>
        <hr />
        <div className="row d-flex align-items-center">
          <span className="col-12 col-lg-4 mb-3 mb-lg-0">
            Select the catalog you want to modify:
          </span>
          <div className="col-12 col-lg-8 ">
            <select
              className="form-control"
              onChange={this.handleCatalogChange}
            >
              <option defaultValue>Suppliers</option>
            </select>
          </div>
        </div>

        <hr className="mb-4" />

        {this.renderCurrentCatalog()}
      </React.Fragment>
    );
  }
}

export default Catalogs;
