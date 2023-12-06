import { createTheme, responsiveFontSizes } from "@mui/material";

const theme = responsiveFontSizes(
	createTheme({
		breakpoints: {
			values: {
				lg: 1216,
				md: 1024,
				sm: 769,
				xl: 1408,
				xs: 0
			}
		},
		components: {
			MuiCssBaseline: {
				styleOverrides: {
					body: {
						backgroundColor: "#133478"
					}
				}
			},
			MuiInputBase: {
				styleOverrides: {
					root: {
						color: "#fff"
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
		},
		palette: {
			background: {
				default: "#fff",
				paper: "#fff"
			},
			divider: "#D3D3D3",
			primary: {
				contrastText: "#fff",
				main: "#133478"
			},
			secondary: {
				contrastText: "#133478",
				main: "#fff"
			}
		},
		typography: {
			fontFamily: ["sans-serif"].join(",")
		}
	})
);

export const standardSize = { lg: "35%", md: "40%", sm: "50%", xl: "25%", xs: "95%" };
export const panelStandardSize = { lg: "60%", md: "70%", sm: "80%", xl: "50%", xs: "95%" };

export default theme;
