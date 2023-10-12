"use client";
import { Home, ContactMail, Login } from "@mui/icons-material";
import AppBar from "@mui/material/AppBar";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import MyLinkButton from "../my/MyLinkButton";
import { useMediaQuery } from "@mui/material";
import { usePathname } from "next/navigation";
import theme from "../ThemeRegistry/theme";

export default function Navbar(): JSX.Element {
    const path = usePathname();
    const isPhone = useMediaQuery(theme.breakpoints.down("md"));

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
            <Toolbar sx={{ justifyContent: "space-between", alignContent: "center" }}>
                <Stack direction="row" alignItems="center">
                    <Link href="/" style={{ textDecoration: "none" }}>
                        <Typography
                            variant="h6"
                            sx={{
                                color: "#fff"
                            }}
                        >
                            {isPhone ? "Emeryci SW" : "Chełmscy Emeryci SW"}
                        </Typography>
                    </Link>
                </Stack>

                <Stack direction="row">
                    <MyLinkButton
                        href="/"
                        text={isPhone ? "" : "Strona główna"}
                        isActive={path === "/"}
                        props={{ startIcon: <Home /> }}
                    />
                    <MyLinkButton
                        href="/contact"
                        text={isPhone ? "" : "Kontakt"}
                        isActive={path === "/contact"}
                        props={{ startIcon: <ContactMail /> }}
                    />
                    <MyLinkButton
                        href="/login"
                        text={isPhone ? "" : "Logowanie"}
                        isActive={path === "/login"}
                        props={{ startIcon: <Login /> }}
                    />
                </Stack>
            </Toolbar>
        </AppBar>
    );
}
