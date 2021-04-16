import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import AuthService from "./../../services/AuthService";
import "./Login.css";
import $ from "jquery";
import Validations from "../../utils/validations";
import { DEFAULT_ERROR } from "../../utils/constants";
import FormErrors from "./../FormErrors";
import Modal from "./../modals/Modal";
import ForgotPasswordModalBody from "./../modals/ForgotPasswordModalBody";

class Login extends Component {
	state = {
		email: "",
		password: "",
		message: "",
		formErrors: [],
		loading: false
	};

	componentDidMount() {
		localStorage.clear();
		this.hideErrorAlert();
	}

	handlePasswordChange = e => {
		this.setState({
			password: e.target.value
		});
	};

	handleEmailChange = e => {
		this.setState({
			email: e.target.value
		});
	};

	handleLoginClick = e => {
		e.preventDefault();
		this.hideErrorAlert();

		if (this.formValid()) {
			this.setState({ loading: true });

			AuthService.login(this.state.email, this.state.password)
				.then(res => {
					if (res.status === 200) {
						localStorage.setItem("auth", JSON.stringify(res.data));
						this.props.onLogin();
						this.props.history.push("/receipts");
					} else {
						throw new Error();
					}
				})
				.catch(err => {
					if (err.response) {
						if (err.response.data.message)
							this.setState({ message: err.response.data.message });
						else if (err.response.data.errors)
							this.setState({ message: "Please verify the entered data." });
					}
					else {
						this.setState({ message: DEFAULT_ERROR });
					}

					this.setState({ loading: false });
					this.showErrorAlert();
				});
		}
	};

	formValid() {
		const { email, password } = this.state;
		let formErrors = [];

		if (!Validations.required(email))
			formErrors.push({
				field: "Email",
				error: "The email is required."
			});
		else if (!Validations.email(email))
			formErrors.push({
				field: "Email",
				error: "Please enter a valid email."
			});

		if (!Validations.required(password))
			formErrors.push({
				field: "Password",
				error: "The password is required."
			});

		this.setState({ formErrors });
		return formErrors.length === 0;
	}

	showErrorAlert() {
		$("#errorAlert").show();
	}

	hideErrorAlert() {
		$("#errorAlert").hide();
	}

	render() {
		const { email, password, message, formErrors, loading } = this.state;

		return (
			<React.Fragment>
				<div className="backgroundImage w-100 vh-100"></div>

				<div className="vh-100 d-flex justify-content-center align-items-center">
					<div className="login-form">
						<div className="d-none d-lg-flex login-form__info">
							<div className="w-100">
								<h3>Receipts App</h3>
								<hr className="login-form__info-separator my-4" />
								<p>Receipts App is a simple CRUD web app built with React framework.</p>
								<p>This project integrates multiple technologies, such as React, Firebase, .NET Core, EF Core, etc. Feel free to explore it.</p>
								<a  href="https://github.com/gerardormz98/simple-crud-app" target="_blank" rel="noopener noreferrer" className="btn btn-light btn-block rounded-pill">Learn more</a>

								<div className="social-links mt-4">
									<a href="https://github.com/gerardormz98/" target="_blank" rel="noopener noreferrer" className="socials-badge rounded-circle"><FontAwesomeIcon icon={faGithub} /></a>
									<a href="https://www.linkedin.com/in/grmz98/" target="_blank" rel="noopener noreferrer" className="socials-badge rounded-circle"><FontAwesomeIcon icon={faLinkedin} /></a>
								</div>
							</div>
						</div>

						<div className="login-form__form">
							<div className="w-100">
								<div className="d-flex align-items-center justify-content-center">
									<img 
										src="img/receipt-icon.svg"
										className="login-form__logo mr-3 mb-2"
										alt=""
									></img>
									<h3>Sign In</h3>
								</div>
								<hr className="login-form__form-separator mb-4" />

								<FormErrors errors={formErrors} />

								<div id="errorAlert" className="alert alert-danger" role="alert">
									<small>
										<strong>Error: </strong>
										{message}
									</small>
								</div>

								<form onSubmit={this.handleLoginClick}>
									<div className="input-group mb-3">
										<div className="input-group-prepend">
											<div className="input-group-text">
												<FontAwesomeIcon icon={faEnvelope} />
											</div>
										</div>
										<input
											type="text"
											className={`form-control ${formErrors.some(e => e.field === "Email")
													? "is-invalid"
													: ""
												}`}
											placeholder="Email"
											value={email}
											onChange={this.handleEmailChange}
											autoFocus
										/>
									</div>

									<div className="input-group mb-4">
										<div className="input-group-prepend">
											<div className="input-group-text">
												<FontAwesomeIcon icon={faKey} />
											</div>
										</div>
										<input
											type="password"
											className={`form-control ${formErrors.some(e => e.field === "Password")
													? "is-invalid"
													: ""
												}`}
											placeholder="Password"
											value={password}
											onChange={this.handlePasswordChange}
										/>
									</div>

									<button
										type="submit"
										className={`btn btn-primary btn-block rounded-pill ${loading ? "btn-secondary disabled" : ""
											}`}
									>
										{loading ? (
											<span
												className="spinner-border spinner-border-sm mr-2"
												style={{ marginBottom: 2 }}
												role="status"
											></span>
										) : (
											""
										)}

										{loading ? "Signing in..." : "Sign in"}
									</button>
								</form>

								<hr className="mt-4" />

								<button
									type="button"
									className="btn btn-link btn-sm ml-auto"
									data-toggle="modal"
									data-target="#forgotPasswordModal"
									disabled={loading}
								>
									Forgot password?
								</button>
							</div>
						</div>
					</div>
				</div>

				<Modal
					modalId="forgotPasswordModal"
					modalTitle="Password recovery"
					modalBody={<ForgotPasswordModalBody />}
				/>
			</React.Fragment>
		);
	}
}

export default Login;
