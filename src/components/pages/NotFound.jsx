import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUnlink } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

class NotFound extends Component {
  state = {};

  render() {
    return (
      <div className="w-100 d-flex flex-column align-items-center mt-5">
        <FontAwesomeIcon
          style={{
            color: "lightgray"
          }}
          icon={faUnlink}
          size="10x"
          className="mb-5"
        />
        <p className="h1">404 - Not found</p>
        <p>La página que solicitas no fue encontrada.</p>
        <Link to="/recibos">
          <button className="btn btn-link">Regresar a Mis Recibos</button>
        </Link>
      </div>
    );
  }
}

export default NotFound;
