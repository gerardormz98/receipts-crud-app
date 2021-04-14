import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faPencilAlt,
  faTrash,
  faUsers
} from "@fortawesome/free-solid-svg-icons";
import { MDBDataTable } from "mdbreact";
import AuthService from "../../services/AuthService";
import Modal from "../modals/Modal";
import UserService from "../../services/UserService";
import NewUserModalBody from "../modals/NewUserModalBody";
import DeleteUserModalBody from "../modals/DeleteUserModalBody";
import EditUserModalBody from "../modals/EditUserModalBody";

class Users extends Component {
  state = {
    data: {},
    selectedUser: {},
    loading: false
  };

  addRowsToState(rows) {
    this.setState({
      data: {
        columns: [
          {
            label: "ID",
            field: "userID",
            sort: "asc"
          },
          {
            label: "Email",
            field: "email",
            sort: "asc"
          },
          {
            label: "Admin",
            field: "isAdmin",
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

  addSelectedUserToState = user => {
    const { userID, email, isAdmin } = user;
    this.setState({
      selectedUser: { userID, email, isAdmin: isAdmin === "Yes" }
    });
  };

  processRows(rows) {
    rows.forEach(r => {
      r.actions = (
        <div className="d-flex justify-content-center">
          <button
            type="button"
            data-toggle="modal"
            data-target="#editUserModal"
            style={{ width: 27, height: 27 }}
            className="btn btn-info btn-small p-0 w-0 mr-2"
            onClick={() => this.addSelectedUserToState(r)}
          >
            <FontAwesomeIcon icon={faPencilAlt} size="sm" />
          </button>
          <button
            type="button"
            data-toggle="modal"
            data-target="#deleteUserModal"
            style={{ width: 27, height: 27 }}
            className="btn btn-danger btn-small p-0 w-0"
            onClick={() => this.addSelectedUserToState(r)}
          >
            <FontAwesomeIcon icon={faTrash} size="sm" />
          </button>
        </div>
      );
      r.isAdmin = r.isAdmin ? "Yes" : "No";
    });

    return rows;
  }

  refreshUsers = (showAnimation = false) => {
    if (showAnimation) this.setState({ loading: true });

    UserService.getUsers()
      .then(res => {
        if (res.status === 200) {
          this.setState({ loading: false });
          this.addRowsToState(res.data);
        }
      })
      .catch(err => {});
  };

  componentDidMount() {
    const user = AuthService.getUserInfo();
    if (!user.isAdmin) this.props.history.push("/receipts");
    else this.refreshUsers(true);
  }

  render() {
    return (
      <React.Fragment>
        <div className="w-100 d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <FontAwesomeIcon
              icon={faUsers}
              size="2x"
              style={{ color: "#343a40" }}
            />
            <h3 className="mb-0 ml-3">Users</h3>
          </div>
          <button
            className="btn btn-success"
            data-toggle="modal"
            data-target="#newUserModal"
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
          />
        )}

        <Modal
          modalId="newUserModal"
          modalTitle="Add new user"
          modalBody={
            <NewUserModalBody onUserAdded={this.refreshUsers} />
          }
        />

        <Modal
          modalId="editUserModal"
          modalTitle="Edit user"
          modalBody={
            <EditUserModalBody
              user={this.state.selectedUser}
              onUserEdited={this.refreshUsers}
            />
          }
        />

        <Modal
          modalId="deleteUserModal"
          modalTitle="Delete user"
          modalBody={
            <DeleteUserModalBody
              user={this.state.selectedUser}
              onUserDeleted={this.refreshUsers}
            />
          }
        />
      </React.Fragment>
    );
  }
}

export default Users;
