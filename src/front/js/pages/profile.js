import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";

const Profile = () => {
	const [email, setEmail] = useState("");

	const { actions } = useContext(Context);
	const history = useHistory();

	useEffect(() => {
		let accessToken = actions.getAccessToken();
		if (!accessToken) {
			history.push("/login");
			return;
		}
		fetch("https://3001-plum-hyena-jrwsxvmx.ws-eu03.gitpod.io/api/profile", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + actions.getAccessToken()
			}
		})
			.then(response => response.json())
			.then(responseJson => setEmail(responseJson.email));
	}, []);

	return (
		<div className="jumbotron">
			<div>Email: {email}</div>
			<div />
		</div>
	);
};

export default Profile;
