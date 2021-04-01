import React, { useState } from "react";

const SignUp = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState("");
	const [message, setMessage] = useState("");

	function signup(event) {
		event.preventDefault();
		setError("");
		setMessage("");
		if (email == "") {
			setError("Email obligatorio");
			return;
		}
		if (password != confirmPassword) {
			setError("Las contraseñas no coinciden");
			return;
		}
		let responseOk = false;
		fetch("https://3001-plum-hyena-jrwsxvmx.ws-eu03.gitpod.io/api/signup", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email: email,
				password: password
			})
		})
			.then(response => {
				responseOk = response.ok;
				if (response.ok) {
					setMessage("Usuario registrado correctamente");
				}
				return response.json();
			})
			.then(responseJson => {
				if (!responseOk) {
					setError(responseJson.message);
				}
			})
			.catch(error => {
				setError(error.message);
			});
		return false;
	}

	return (
		<div className="jumbotron">
			{error ? <h1>{error}</h1> : ""}
			{message ? <h1>{message}</h1> : ""}
			<form onSubmit={signup}>
				<span>* is required</span>
				<input
					type="email"
					placeholder="email"
					required
					onChange={event => {
						setEmail(event.target.value);
					}}
				/>
				*
				<input
					type="password"
					placeholder="password"
					required
					onChange={event => {
						setPassword(event.target.value);
					}}
				/>
				<input
					type="password"
					required
					placeholder="confirm password"
					onChange={event => {
						setConfirmPassword(event.target.value);
					}}
				/>
				<input type="submit" value="Crear" />
			</form>
		</div>
	);
};

export default SignUp;
