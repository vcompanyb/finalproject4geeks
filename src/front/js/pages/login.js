import React, { useState } from "react";

const LogIn = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	function login(event) {
		event.preventDefault();
		setError("");
		if (email == "") {
			setError("Email obligatorio");
			return;
		}

		let responseOk = false;
		fetch("https://3001-plum-hyena-jrwsxvmx.ws-eu03.gitpod.io/api/login", {
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
				return response.json();
			})
			.then(responseJson => {})
			.catch(error => {
				setError(error.message);
			});
		return false;
	}

	return (
		<div className="jumbotron">
			{error ? <h1>{error}</h1> : ""}
			<form onSubmit={login}>
				<input
					type="email"
					placeholder="email"
					required
					onChange={event => {
						setEmail(event.target.value);
					}}
				/>

				<input
					type="password"
					placeholder="password"
					required
					onChange={event => {
						setPassword(event.target.value);
					}}
				/>

				<input type="submit" value="Acceder" />
			</form>
		</div>
	);
};

export default LogIn;
