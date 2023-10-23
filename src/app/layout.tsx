import "../assets/global.css";

import { Box, Stack } from "@mui/material";
import { Toaster } from "react-hot-toast";

import Navbar from "@/components/layout/Navbar";
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";

export default function RootLayout({ children }: { children: JSX.Element }): JSX.Element {
	return (
		<html lang="en">
			<body>
				<ThemeRegistry>
					<Stack
						minHeight={"100vh"}
						display="flex"
						flexDirection="column"
						className="background"
					>
						<Navbar />
						<Box
							component={"main"}
							flex={1}
							overflow="auto"
							color="primary.contrastText"
							py={{ xs: 1, sm: 2, lg: 3 }}
						>
							{children}
						</Box>
					</Stack>
					<Toaster
						position="bottom-center"
						gutter={10}
						containerStyle={{ marginBottom: "40px" }}
						toastOptions={{
							style: {
								maxWidth: "500px"
							}
						}}
					/>
				</ThemeRegistry>
			</body>
		</html>
	);
}
