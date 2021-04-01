import React, { useState } from "react";

const SignUp = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState("");
	const [message, setMessage] = useState("");

	function signup() {
		setError("");
		setMessage("");
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
	}

	return (
		<div className="jumbotron">
			{error ? <h1>{error}</h1> : ""}
			{message ? <h1>{message}</h1> : ""}
			<input
				type="email"
				placeholder="email"
				onChange={event => {
					setEmail(event.target.value);
				}}
			/>
			<input
				type="password"
				placeholder="password"
				onChange={event => {
					setPassword(event.target.value);
				}}
			/>
			<input
				type="password"
				placeholder="confirm password"
				onChange={event => {
					setConfirmPassword(event.target.value);
				}}
			/>
			<input type="button" value="Crear" onClick={signup} />
		</div>
	);
};

export default SignUp;
