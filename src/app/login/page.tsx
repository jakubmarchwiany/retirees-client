import { LoginForm } from "@/components/Login/LoginForm";
import { LockOpenOutlined } from "@mui/icons-material";
import { Avatar, Container, Stack, Typography } from "@mui/material";

export default function LoginPage(): JSX.Element {
	return (
		<Container
			component="main"
			maxWidth={false}
			sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center"
			}}
		>
			<Stack alignItems={"center"}>
				<Avatar
					sx={{
						bgcolor: "primary.main",
						width: "5rem",
						height: "5rem",
						color: "white"
					}}
				>
					<LockOpenOutlined fontSize="large" />
				</Avatar>

				<Typography color="white" mt={1} variant="h4">
					Zaloguj się
				</Typography>

				<LoginForm />
			</Stack>
		</Container>
	);
}
