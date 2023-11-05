import ToastProvider from "@/app/components/layout/ToastProvider";
import { Box, Stack } from "@mui/material";

import "../assets/global.css";
import ThemeRegistry from "./components/ThemeRegistry/ThemeRegistry";
import Navbar from "./components/layout/Navbar";

export default function RootLayout({ children }: { children: JSX.Element }): JSX.Element {
	return (
		<html lang="en">
			<body>
				<ThemeRegistry>
					<Stack
						className="background"
						display="flex"
						flexDirection="column"
						minHeight={"100vh"}
					>
						<Navbar />
						<ToastProvider />
						<Box
							color="primary.contrastText"
							component={"main"}
							flex={1}
							overflow="auto"
							py={{ xs: 1, sm: 2, lg: 3 }}
						>
							{children}
						</Box>
					</Stack>
				</ThemeRegistry>
			</body>
		</html>
	);
}
