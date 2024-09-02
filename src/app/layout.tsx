import ToastProvider from "@/app/components/layout/ToastProvider";
import { Box, Stack, ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";

import "../assets/global.css";
import Navbar from "./components/layout/Navbar";
import theme from "./components/theme/theme";

export default function RootLayout({ children }: { children: JSX.Element }): JSX.Element {
	return (
		<html lang="pl">
			<body>
				<AppRouterCacheProvider>
					<ThemeProvider theme={theme}>
						<Stack
							className="background"
							display="flex"
							flexDirection="column"
							minHeight="100vh"
						>
							<Navbar />
							<ToastProvider />
							<Box
								color="primary.contrastText"
								component="main"
								flex={1}
								overflow="auto"
								py={{ lg: 3, sm: 2, xs: 1 }}
							>
								{children}
							</Box>
						</Stack>
					</ThemeProvider>
				</AppRouterCacheProvider>
			</body>
		</html>
	);
}
