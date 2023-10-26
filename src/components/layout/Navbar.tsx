"use client";

import { ContactMail, Home, Login } from "@mui/icons-material";
import { useMediaQuery } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { usePathname } from "next/navigation";

import theme from "../ThemeRegistry/theme";
import MyLinkButton from "../my/MyLinkButton";

export default function Navbar(): JSX.Element {
	const path = usePathname();
	const isPhone = useMediaQuery(theme.breakpoints.down("md"));

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
			<Toolbar sx={{ justifyContent: "space-between", alignContent: "center" }}>
				<Stack alignItems="center" direction="row">
					<Link href="/" style={{ textDecoration: "none" }}>
						<Typography
							sx={{
								color: "#fff"
							}}
							variant="h6"
						>
							{isPhone ? "Emeryci SW" : "Chełmscy Emeryci SW"}
						</Typography>
					</Link>
				</Stack>

				<Stack direction="row">
					<MyLinkButton
						href="/"
						isActive={path === "/"}
						props={{ startIcon: <Home /> }}
						text={isPhone ? "" : "Strona główna"}
					/>
					<MyLinkButton
						href="/contact"
						isActive={path === "/contact"}
						props={{ startIcon: <ContactMail /> }}
						text={isPhone ? "" : "Kontakt"}
					/>
					<MyLinkButton
						href="/login"
						isActive={path === "/login"}
						props={{ startIcon: <Login /> }}
						text={isPhone ? "" : "Logowanie"}
					/>
				</Stack>
			</Toolbar>
		</AppBar>
	);
}
