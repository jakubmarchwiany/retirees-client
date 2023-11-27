import { Box, Container, Stack, Typography } from "@mui/material";

export default function ContactPage(): JSX.Element {
	return (
		<Stack textAlign="center">
			<Typography variant="h1">Kontakt</Typography>
			<Typography mt="2.5vh" variant="h5">
				<b>Masz pytanie napisz</b>
			</Typography>

			<Typography mt={1.5} variant="h5">
				<a href="mailto:chelmscyemerycisw@gmail.com" style={{ color: "white" }}>
					chelmscyemerycisw@gmail.com
				</a>
			</Typography>
			<Typography mt="5vh" variant="h5">
				<b>Adres</b> <br />
				Zarząd koła EiRSW
				<br /> 22-100 Chełm, ul. Kolejowa 112
			</Typography>
			<Typography mt="10vh" variant="h5">
				<b>Autor strony</b>
			</Typography>
			<Typography mt={1.5} variant="h5">
				<a href="mailto:jakubmarchwiany@icloud.com" style={{ color: "white" }}>
					jakubmarchwiany@icloud.com
				</a>
			</Typography>
		</Stack>
	);
}
