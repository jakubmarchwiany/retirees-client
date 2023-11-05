"use client";

import { postFetch } from "@/app/components/utils/fetches";
import { sleep } from "@/app/components/utils/sleep";
import { LoadingButton } from "@mui/lab";
import { Checkbox, FormControlLabel, Stack, TextField } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import React, { SyntheticEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

export function LoginForm(): JSX.Element {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [rememberMe, setRememberMe] = useState(false);
	const [loading, setLoading] = useState(false);

	const router = useRouter();
	const searchParams = useSearchParams();

	useEffect(() => {
		const message = searchParams.get("message");

		if (message !== null) {
			toast.error(message);
		}
	}, []);

	const handleLogin = (event: SyntheticEvent): void => {
		event.preventDefault();

		setLoading(true);

		postFetch({ username, password, rememberMe }, `/auth/login`, { customError: true })
			.then(async () => {
				await sleep(500);

				window.location.href = "/admin";
			})
			.catch(() => {
				setLoading(false);
			});
	};

	return (
		<Stack component={"form"} mt={2} onSubmit={handleLogin}>
			<TextField
				label="Nazwa użytkownika"
				onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
					setUsername(event.target.value);
				}}
				value={username}
				variant="filled"
			/>
			<TextField
				label="Hasło"
				onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
					setPassword(event.target.value);
				}}
				type="password"
				value={password}
				variant="filled"
			/>
			<LoadingButton
				disabled={username == "" || password == ""}
				loading={loading}
				type="submit"
				variant="contained"
			>
				Zaloguj
			</LoadingButton>
			<FormControlLabel
				control={
					<Checkbox
						onChange={(e): void => setRememberMe(e.target.checked)}
						value={rememberMe}
					/>
				}
				label="Zapamiętaj mnie"
				sx={{ color: "white" }}
			/>
		</Stack>
	);
}
