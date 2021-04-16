import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

class NotFound extends Component {
  state = {};

  render() {
    return (
      <div className="w-100 d-flex flex-column align-items-center mt-5">
        <img 
          src="img/sad-dog.png"
          className="not-found__image"
        />
        <p className="h1 text-center">404 - Not found</p>
        <p>The requested page was not found.</p>
        <Link to="/receipts" className="mb-4">
          <button className="btn btn-link">Go back to my receipts</button>
        </Link>
      </div>
    );
  }
}

export default NotFound;
