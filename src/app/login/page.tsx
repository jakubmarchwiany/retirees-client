import { LoginForm } from "@/app/login/components/LoginForm";
import { LockOpenOutlined } from "@mui/icons-material";
import { Avatar, Container, Stack, Typography } from "@mui/material";

export default function LoginPage(): JSX.Element {
	return (
		<Container
			component="main"
			maxWidth={false}
			sx={{
				alignItems: "center",
				display: "flex",
				justifyContent: "center"
			}}
		>
			<Stack alignItems="center">
				<Avatar
					sx={{
						bgcolor: "primary.main",
						color: "white",
						height: "5rem",
						width: "5rem"
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
