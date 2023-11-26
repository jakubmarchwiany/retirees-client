import AppBar from "@mui/material/AppBar";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { cookies } from "next/headers";

import AdminButtons from "./navbar/AdminButtons";
import UserButton from "./navbar/UserButtons";

export default function Navbar(): JSX.Element {
	const cookieStore = cookies();
	const token = cookieStore.get("authorization");

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
						Chełmscy Emeryci SW
					</Typography>
				</Stack>

				{token !== undefined ? <AdminButtons /> : <UserButton />}
			</Toolbar>
		</AppBar>
	);
}
