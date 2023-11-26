"use client";

import theme from "@/app/components/ThemeRegistry/theme";
import MyLinkButton from "@/app/components/my/MyLinkButton";
import { ContactMail, Info, Login } from "@mui/icons-material";
import { Stack, useMediaQuery } from "@mui/material";
import { usePathname } from "next/navigation";

export default function UserButton(): JSX.Element {
	const isPhone = useMediaQuery(theme.breakpoints.down("md"));

	const path = usePathname();

	return (
		<Stack alignItems="center" direction="row">
			<MyLinkButton
				href="/"
				isActive={path === "/"}
				props={{ startIcon: <Info /> }}
				text={isPhone ? "" : "Informacje"}
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
	);
}
