"use client";

import { ContactMail, Info, Login, Logout, PostAdd } from "@mui/icons-material";
import { Button, useMediaQuery } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import theme from "../ThemeRegistry/theme";
import MyLinkButton from "../my/MyLinkButton";

export default function Navbar(): JSX.Element {
	const [isAdmin, setIsAdmin] = useState(false);
	const path = usePathname();
	const isPhone = useMediaQuery(theme.breakpoints.down("md"));

	const router = useRouter();
	const token = Cookies.get("authorization");

	useEffect(() => {
		if (token !== undefined) {
			setIsAdmin(true);
		} else {
			setIsAdmin(false);
		}
	}, [token]);

	const url_prefix = isAdmin ? "/admin" : "/";

	return (
		<AppBar
			elevation={0}
			position="static"
			sx={{
				top: "auto",
				background: "transparent",
				boxShadow: 3
			}}
		>
			<Toolbar sx={{ justifyContent: "space-between", alignItems: "center" }}>
				<Stack alignItems="center" direction="row">
					<Typography
						sx={{
							color: "#fff"
						}}
						variant="h6"
					>
						{isPhone ? "Emeryci SW" : "Chełmscy Emeryci SW"}
					</Typography>
				</Stack>

				<Stack alignItems="center" direction="row">
					<MyLinkButton
						href={url_prefix}
						isActive={path === url_prefix}
						props={{ startIcon: <Info /> }}
						text={isPhone ? "" : "Informacje"}
					/>
					<MyLinkButton
						href={"/contact"}
						isActive={path === "/contact"}
						props={{ startIcon: <ContactMail /> }}
						text={isPhone ? "" : "Kontakt"}
					/>

					{isAdmin ? (
						<>
							<MyLinkButton
								href="/admin/post/create"
								isActive={path === "/login"}
								props={{ startIcon: <PostAdd /> }}
								text={isPhone ? "" : "Stwórz"}
							/>
							<Button
								disabled={false}
								fullWidth
								onClick={(): void => {
									Cookies.remove("authorization");

									router.push("/");
								}}
								size="large"
								startIcon={<Logout />}
								sx={{ color: "primary.main" }}
							>
								{isPhone ? "" : "Wyloguj"}
							</Button>
						</>
					) : (
						<MyLinkButton
							href="/login"
							isActive={path === "/login"}
							props={{ startIcon: <Login /> }}
							text={isPhone ? "" : "Logowanie"}
						/>
					)}
				</Stack>
			</Toolbar>
		</AppBar>
	);
}
