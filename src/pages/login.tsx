import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import { Avatar, Box, Button, Container, Typography } from "@mui/material";
import Head from "next/head";
import { useState } from "react";
import toast from "react-hot-toast";
import MyTextField from "../components/my/MyTextField";
import { sleep } from "../utils/useFull";

const NODE_ENV = process.env.NODE_ENV;
const DEV_BACKEND_API_ENDPOINT = process.env.NEXT_PUBLIC_DEV_BACKEND_URL;

export const logging = async () => {
    toast.success("Przekierowywanie do panelu admina", { duration: 3000 });
    await sleep(1000);
    const timer = toast.success("2");
    await sleep(1000);
    toast.success("1", { id: timer });
    await sleep(1000);
    toast.success("0", { id: timer });

    if (NODE_ENV === "production") window.location.href = window.location.origin + "/admin/home";
};

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = () => {
        const END_POINT =
            NODE_ENV === "development"
                ? DEV_BACKEND_API_ENDPOINT
                : window.location.origin + "/backend";

        const toastId = toast.loading("Ładowanie...");
        fetch(END_POINT + `/auth/login`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        })
            .then(async (response) => {
                const data = await response.json();
                if (response.ok) {
                    toast.success(data.message, { id: toastId });
                    logging();
                } else {
                    toast.error(data.message, { id: toastId });
                }
            })
            .catch(() => {
                toast.error("Coś poszło nie tak :(", { id: toastId });
            });
    };

    return (
        <>
            <Head>
                <title>Logowanie</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="description" content="Logowanie do aplikacji" />
            </Head>
            <Container
                component="main"
                sx={{
                    px: { xs: 5, sm: 30, md: 15, lg: 30, xl: 40 },
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar
                        sx={{
                            mb: 4,
                            bgcolor: "primary.main",
                            width: "70px",
                            height: "70px",
                            color: "white",
                        }}
                    >
                        <LockOpenOutlinedIcon fontSize="large" />
                    </Avatar>

                    <Typography component="h1" variant="h4">
                        Zaloguj się
                    </Typography>
                    <Box component={"form"} noValidate sx={{ mt: 3 }}>
                        <MyTextField
                            name="username"
                            label="Nazwa użytkownika"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                            autoFocus
                        />
                        <MyTextField
                            name="password"
                            type="password"
                            label="Hasło"
                            autoComplete="current-password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                        <Button
                            type="button"
                            onClick={onSubmit}
                            fullWidth
                            variant="contained"
                            sx={{ mt: 2, mb: 2 }}
                            disabled={username.length === 0 || password.length === 0}
                        >
                            Zaloguj
                        </Button>
                    </Box>
                </Box>
            </Container>
        </>
    );
}
export default Login;
