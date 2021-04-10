import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import moment from "moment";
import "moment/locale/es";

moment.locale("es");

ReactDOM.render(<App />, document.getElementById("root"));