"use client";

import theme from "@/components/ThemeRegistry/theme";
import MyLinkButton from "@/components/my/MyLinkButton";
import { Edit, Logout, PostAdd } from "@mui/icons-material";
import { Button, Stack, useMediaQuery } from "@mui/material";
import Cookies from "js-cookie";
import { usePathname } from "next/navigation";

export default function AdminButtons(): JSX.Element {
	const isPhone = useMediaQuery(theme.breakpoints.down("md"));
	const path = usePathname();

	return (
		<Stack alignItems="center" direction="row">
			<MyLinkButton
				href="/admin/post/create"
				isActive={path === "/login"}
				props={{ startIcon: <PostAdd /> }}
				text={isPhone ? "" : "Dodaj"}
			/>
			<MyLinkButton
				href={"/admin"}
				isActive={path === "/admin"}
				props={{ startIcon: <Edit /> }}
				text={isPhone ? "" : "edycja"}
			/>

			<Button
				disabled={false}
				fullWidth
				onClick={(): void => {
					Cookies.remove("authorization");

					window.location.href = "/";
				}}
				size="large"
				startIcon={<Logout />}
				sx={{ color: "primary.main" }}
			>
				{isPhone ? "" : "Wyloguj"}
			</Button>
		</Stack>
	);
}
