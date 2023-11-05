import { createTheme, responsiveFontSizes } from "@mui/material";

const theme = responsiveFontSizes(
	createTheme({
		palette: {
			primary: {
				main: "#133478",
				contrastText: "#fff"
			},
			secondary: {
				main: "#fff",
				contrastText: "#133478"
			},
			background: {
				default: "#fff",
				paper: "#fff"
			},
			divider: "#D3D3D3"
		},
		typography: {
			fontFamily: ["sans-serif"].join(",")
		},
		breakpoints: {
			values: {
				xs: 0,
				sm: 769,
				md: 1024,
				lg: 1216,
				xl: 1408
			}
		},
		components: {
			MuiInputBase: {
				styleOverrides: {
					root: {
						color: "#fff"
					}
				}
			},
			MuiCssBaseline: {
				styleOverrides: {
					body: {
						backgroundColor: "#133478"
					}
				}
			},
			MuiTooltip: {
				styleOverrides: {
					tooltip: {
						fontSize: "1rem",
						maxWidth: "50vw"
					}
				}
			}
		}
	})
);

export const standardSize = { xs: "95%", sm: "50%", md: "40%", lg: "35%", xl: "25%" };
export const panelStandardSize = { xs: "95%", sm: "80%", md: "70%", lg: "60%", xl: "50%" };

export default theme;
