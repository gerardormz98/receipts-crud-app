import React, { Component } from "react";
import { NavLink, Link, withRouter } from "react-router-dom";
import "./Navbar.css";

class Navbar extends Component {
  state = {};

  handleLogOut = () => {
    localStorage.removeItem("auth");
    this.props.onLogout();
    this.props.history.push("/login");
  };

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link to="/">
          <div className="navbar-brand mr-4">
            <img
              className="mr-2"
              src="img/receipt-icon.svg"
              width="28"
              height="25"
              alt="Icon"
            />
            <b>Simple CRUD</b>
          </div>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mr-auto">
            <NavLink
              activeClassName="active"
              to="/recibos"
              className="text-decoration-none"
            >
              <li className="nav-item">
                <span className="nav-link">Mis recibos</span>
              </li>
            </NavLink>
            {this.props.esAdmin ? this.getAdminOptions() : null}
            <NavLink
              activeClassName="active"
              to="/perfil"
              className="text-decoration-none"
            >
              <li className="nav-item">
                <span className="nav-link">Perfil</span>
              </li>
            </NavLink>
          </ul>
          <span className="navbar-text">¡Hola, {this.props.correo}!</span>
          <button
            type="button"
            className="btn btn-link pl-0 pl-lg-3 text-danger d-block d-lg-inline-block"
            onClick={this.handleLogOut}
          >
            Cerrar sesión
          </button>
        </div>
      </nav>
    );
  }

  getAdminOptions() {
    return (
      <React.Fragment>
        <NavLink
          activeClassName="active"
          to="/usuarios"
          className="text-decoration-none"
        >
          <li className="nav-item">
            <span className="nav-link">Usuarios</span>
          </li>
        </NavLink>
        <NavLink
          activeClassName="active"
          to="/catalogos"
          className="text-decoration-none"
        >
          <li className="nav-item">
            <span className="nav-link">Catálogos</span>
          </li>
        </NavLink>
      </React.Fragment>
    );
  }
}

export default withRouter(Navbar);
