import React, { useState } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 360,
	bgcolor: "background.paper",
	boxShadow: 24,
	p: 4,
	borderRadius: 2,
};

function Login({ open, onClose }) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleLogin = () => {
		if (username === "admin" && password === "admin123") {
			setError("");
			onClose();
			navigate("/admin");
		} else {
			setError("Invalid username or password");
		}
	};

	return (
		<Modal
			open={open}
			onClose={onClose}>
			<Box sx={style}>
				<Typography
					variant="h5"
					mb={2}>
					Login to Admin Panel
				</Typography>
				<TextField
					fullWidth
					label="Username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					margin="normal"
				/>
				{error && (
					<Typography
						color="error"
						fontSize={14}>
						{error}
					</Typography>
				)}
				<TextField
					fullWidth
					label="Password"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					margin="normal"
				/>
				<Button
					variant="contained"
					fullWidth
					sx={{ mt: 2 }}
					onClick={handleLogin}>
					Login
				</Button>
			</Box>
		</Modal>
	);
}

export default Login;
