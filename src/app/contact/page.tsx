import { Box, Container, Typography } from "@mui/material";

export default function ContactPage(): JSX.Element {
	return (
		<Container
			component="main"
			sx={{
				px: { xs: 5, sm: 30, md: 15, lg: 30, xl: 40 }
			}}
		>
			<Box textAlign="center">
				<Typography variant="h1">Kontakt</Typography>
				<Typography mt="10%" variant="h5">
					<b>Masz pytanie napisz</b>
				</Typography>

				<Typography mt="1%" variant="h5">
					<a href="mailto:name@email.com" style={{ color: "lightgray" }}>
						chelmscyemerycisw@gmail.com
					</a>
				</Typography>
				<Typography mt="7.5%" variant="h5">
					<b>Adres</b> <br />
					Zarząd koła
					<br /> 20-100 Chełm, ul. Kolejowa 112
				</Typography>
				<Typography mt="7.5%" variant="h5">
					<b>Autor strony</b>
				</Typography>
				<Typography mt="1%" variant="h5">
					<a href="mailto:name@email.com" style={{ color: "lightgray" }}>
						jakubmarchwiany@icloud.com
					</a>
				</Typography>
			</Box>
		</Container>
	);
}
