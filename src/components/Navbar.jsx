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
            <b>Receipts CRUD</b>
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
              to="/receipts"
              className="text-decoration-none"
            >
              <li className="nav-item">
                <span className="nav-link">My receipts</span>
              </li>
            </NavLink>
            {this.props.isAdmin ? this.getAdminOptions() : null}
            <NavLink
              activeClassName="active"
              to="/profile"
              className="text-decoration-none"
            >
              <li className="nav-item">
                <span className="nav-link">Profile</span>
              </li>
            </NavLink>
          </ul>
          <span className="navbar-text">Hi, {this.props.email}!</span>
          <button
            type="button"
            className="btn btn-link pl-0 pl-lg-3 text-danger d-block d-lg-inline-block"
            onClick={this.handleLogOut}
          >
            Log out
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
          to="/users"
          className="text-decoration-none"
        >
          <li className="nav-item">
            <span className="nav-link">Users</span>
          </li>
        </NavLink>
        <NavLink
          activeClassName="active"
          to="/catalogs"
          className="text-decoration-none"
        >
          <li className="nav-item">
            <span className="nav-link">Catalogs</span>
          </li>
        </NavLink>
      </React.Fragment>
    );
  }
}

export default withRouter(Navbar);
