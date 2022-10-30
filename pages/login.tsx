import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import { Avatar, Box, Button, Container, Typography } from "@mui/material";
import Head from "next/head";
import { useState } from "react";
import MyTextField from "../src/components/my/MyTextField";
import Notification, { NotificationProps } from "../src/layout/Notification";

const NODE_ENV = process.env.NODE_ENV;
const DEV_BACKEND_API_ENDPOINT = process.env.NEXT_PUBLIC_DEV_BACKEND_URL;

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState<NotificationProps>({
    open: false,
    message: "",
    type: "error",
  });

  const onSubmit = () => {
    const END_POINT =
      NODE_ENV === "development"
        ? DEV_BACKEND_API_ENDPOINT
        : window.location.origin + "/backend";

    fetch(END_POINT + `/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then(async (response) => {
        if (response.ok) {
          window.location.href = window.location.origin + "/admin/home";
        } else {
          throw new Error();
        }
      })
      .catch(() => {
        setNotification({
          open: true,
          message: "Podano nieprawidłowe dane uwierzytelniające",
          type: "error",
        });
      });
  };

  const closeNotification = () => {
    setNotification({ ...notification, open: false });
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <>
      <Head>
        <title>Logowanie</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Logowanie do aplikacji" />
      </Head>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
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
              onChange={handleEmailChange}
              autoFocus
            />

            <MyTextField
              name="password"
              type="password"
              label="Hasło"
              autoComplete="current-password"
              value={password}
              onChange={handlePasswordChange}
            />

            <Button
              type="button"
              onClick={onSubmit}
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
            >
              Zaloguj
            </Button>
          </Box>
        </Box>
        <Notification
          open={notification.open}
          message={notification.message}
          type={notification.type}
          close={closeNotification}
        />
      </Container>
    </>
  );
}
export default Login;
