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
        }
    })
);
export default theme;
