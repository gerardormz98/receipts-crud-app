import React, { Component } from "react";

class FormErrors extends Component {
  render() {
    return (
      <React.Fragment>
        {this.props.errors.length > 0 ? (
          <div className="alert alert-warning" role="alert">
            {this.props.errors.map((err, index) => {
              return (
                <small key={index}>
                  * <strong>{err.field}</strong>: {err.error} <br />
                </small>
              );
            })}
          </div>
        ) : (
          ""
        )}
      </React.Fragment>
    );
  }
}

export default FormErrors;
