"use client";

import MyLinkButton from "@/app/components/my/MyLinkButton";
import theme from "@/app/components/theme/theme";
import { AllInbox, Edit, Logout, PostAdd } from "@mui/icons-material";
import { Button, Stack, useMediaQuery } from "@mui/material";
import Cookies from "js-cookie";
import { usePathname } from "next/navigation";

export default function AdminButtons(): JSX.Element {
	const isPhone = useMediaQuery(theme.breakpoints.down("md"));
	const path = usePathname();

	return (
		<Stack alignItems="center" direction="row">
			<MyLinkButton
				href="/admin"
				isActive={path === "/admin"}
				props={{ startIcon: <AllInbox /> }}
				text={isPhone ? "" : "Posty"}
			/>
			<MyLinkButton
				href="/admin/posts/create"
				isActive={path === "/admin/posts/create"}
				props={{ startIcon: <PostAdd /> }}
				text={isPhone ? "" : "Dodaj"}
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
