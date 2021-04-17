import React, { Component } from "react";
import Navbar from "./Navbar";
import Receipts from "./pages/Receipts";
import Users from "./pages/Users";
import Catalogs from "./pages/Catalogs";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Footer from "./Footer";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import AuthRoute from "./AuthRoute";
import AuthService from "../services/AuthService";

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
        email={userInfo.email}
        isAdmin={userInfo.isAdmin}
      />
    ) : null;

    let mainContainerClass = "container";
    mainContainerClass += isLoggedIn ? " py-4" : "";

    return (
      <Router>
        {navbarComponent}
        <main className={mainContainerClass}>
          <Switch>
            {this.getLoginRoute()}
            <AuthRoute
              path="/"
              exact
              component={Receipts}
              onLogout={this.handleLogout}
            />
            <AuthRoute
              path="/receipts"
              exact
              component={Receipts}
              onLogout={this.handleLogout}
            />
            <AuthRoute
              path="/users"
              exact
              component={Users}
              onLogout={this.handleLogout}
            />
            <AuthRoute
              path="/catalogs"
              exact
              component={Catalogs}
              onLogout={this.handleLogout}
            />
            <AuthRoute
              path="/profile"
              component={Profile}
              onLogout={this.handleLogout}
            />
            <AuthRoute
              path="*"
              component={NotFound}
              onLogout={this.handleLogout}
            />
          </Switch>
        </main>
        { isLoggedIn && <Footer /> }
      </Router>
    );
  }

  getLoginRoute() {
    if (this.state.isLoggedIn)
      return <Redirect path="/login" exact to="/receipts" />;

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
