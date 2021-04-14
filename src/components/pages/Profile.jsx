import React, { Component } from "react";
import AuthService from "../../services/AuthService";
import ChangePasswordModalBody from "../modals/ChangePasswordModalBody";
import Modal from "../modals/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

class Profile extends Component {
  state = {
    user: {
      isAdmin: false,
      email: ""
    },
    message: ""
  };

  componentDidMount() {
    const user = AuthService.getUserInfo();
    this.setState({ user });
  }

  handlePasswordSent = () => {
    this.setState({
      message:
        "An email was sent with the directions to change your password. Please check your inbox."
    });
  };

  render() {
    const { isAdmin, email } = this.state.user;

    return (
      <React.Fragment>
        <div className="d-flex align-items-center">
          <FontAwesomeIcon
            icon={faUserCircle}
            size="2x"
            style={{ color: "#343a40" }}
          />
          <h3 className="mb-0 ml-3">My profile</h3>
        </div>
        <hr />

        <div className="mb-3">
          <span>Current role: </span>
          <span
            className={`badge badge-${isAdmin ? "success" : "primary"} ml-3`}
          >
            {isAdmin ? "Admin" : "User"}
          </span>
        </div>

        <div className="d-flex align-items-center mb-3">
          <span className="align-middle">User: </span>
          <div className="input-group ml-3">
            <div className="input-group-prepend">
              <div className="input-group-text">@</div>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="Correo"
              value={email}
              readOnly
            />
          </div>
        </div>

        <input
          type="button"
          className="btn btn-sm btn-danger"
          value="Change password"
          data-toggle="modal"
          data-target="#changePasswordModal"
        ></input>

        <p className="mt-3">{this.state.message}</p>

        <Modal
          modalId="changePasswordModal"
          modalTitle="Change password"
          modalBody={
            <ChangePasswordModalBody
              onPasswordSent={this.handlePasswordSent}
              user={this.state.user}
            />
          }
        />
      </React.Fragment>
    );
  }
}

export default Profile;
