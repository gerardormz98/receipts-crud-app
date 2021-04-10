import React, { Component } from "react";
import Proveedores from "./Proveedores";
import AuthService from "./../services/AuthService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListAlt } from "@fortawesome/free-solid-svg-icons";

class Catalogos extends Component {
  state = {
    catalogoActual: "Proveedores"
  };

  handleCatalogoChange = e => {
    this.setState({ catalogoActual: e.target.value });
  };

  renderCatalogoActual() {
    const { catalogoActual } = this.state;

    if (catalogoActual === "Proveedores") {
      return <Proveedores />;
    }
  }

  componentDidMount() {
    const user = AuthService.getUserInfo();
    if (!user.isAdmin) this.props.history.push("/recibos");
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
          <h3 className="mb-0 ml-3">Catálogos</h3>
        </div>
        <hr />
        <div className="row seleccionarCatalogo d-flex align-items-center">
          <span className="col-12 col-lg-4 mb-3 mb-lg-0">
            Selecciona el catálogo que quieras modificar:
          </span>
          <div className="col-12 col-lg-8 ">
            <select
              className="form-control"
              onChange={this.handleCatalogoChange}
            >
              <option defaultValue>Proveedores</option>
            </select>
          </div>
        </div>

        <hr className="mb-4" />

        {this.renderCatalogoActual()}
      </React.Fragment>
    );
  }
}

export default Catalogos;
