import React, { Component } from "react";

class Modal extends Component {
  handleConfirmClick = () => {
    this.setState({ loading: true });
  };

  render() {
    const { modalId, modalTitle, modalBody } = this.props;

    return (
      <div
        className="modal fade"
        id={modalId}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalTitle">
                {modalTitle}
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            {modalBody}
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
