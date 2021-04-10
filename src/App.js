import React, { Component } from "react";
import Navbar from "./components/Navbar";
import Recibos from "./components/Recibos";
import Usuarios from "./components/Usuarios";
import Catalogos from "./components/Catalogos";
import Perfil from "./components/Perfil";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import AuthRoute from "./components/AuthRoute";
import AuthService from "./services/AuthService";

class App extends Component {
  state = {
    isLoggedIn: AuthService.isLoggedIn()
  };

  handleLogin = () => {
    this.setState({
      isLoggedIn: true
    });
  };

  handleLogout = () => {
    this.setState({
      isLoggedIn: false
    });
  };

  render() {
    let isLoggedIn = AuthService.isLoggedIn();
    const userInfo = AuthService.getUserInfo();

    const navbarComponent = isLoggedIn ? (
      <Navbar
        onLogout={this.handleLogout}
        correo={userInfo.email}
        esAdmin={userInfo.isAdmin}
      />
    ) : null;

    let mainContainerClass = "container";
    mainContainerClass += isLoggedIn ? " p-4" : "";

    return (
      <Router>
        {navbarComponent}
        <main className={mainContainerClass}>
          <Switch>
            {this.getLoginRoute()}
            <AuthRoute
              path="/"
              exact
              component={Recibos}
              onLogout={this.handleLogout}
            />
            <AuthRoute
              path="/recibos"
              exact
              component={Recibos}
              onLogout={this.handleLogout}
            />
            <AuthRoute
              path="/usuarios"
              exact
              component={Usuarios}
              onLogout={this.handleLogout}
            />
            <AuthRoute
              path="/catalogos"
              exact
              component={Catalogos}
              onLogout={this.handleLogout}
            />
            <AuthRoute
              path="/perfil"
              component={Perfil}
              onLogout={this.handleLogout}
            />
            <AuthRoute
              path="*"
              component={NotFound}
              onLogout={this.handleLogout}
            />
          </Switch>
        </main>
      </Router>
    );
  }

  getLoginRoute() {
    if (this.state.isLoggedIn)
      return <Redirect path="/login" exact to="/recibos" />;

    return (
      <Route
        path="/login"
        exact
        render={props => <Login {...props} onLogin={this.handleLogin} />}
      />
    );
  }
}

export default App;
