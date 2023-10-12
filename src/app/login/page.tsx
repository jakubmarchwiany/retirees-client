import { LoginForm } from "@/components/Login/LoginForm";
import { Container } from "@mui/material";

export default function LoginPage(): JSX.Element {
	return (
		<Container
			component="main"
			maxWidth={false}
			sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				
			}}
		>
			<LoginForm />
		</Container>
	);
}
