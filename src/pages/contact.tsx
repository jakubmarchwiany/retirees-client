import { Box, Container, Typography } from "@mui/material";
import Head from "next/head";

function Contact() {
    return (
        <>
            <Head>
                <title>Kontakt</title>
                <meta
                    name="description"
                    content="Strona kontaktowa. Tutaj znajdziesz dane kontaktowe"
                />
                <link rel="canonical" href="/contact" />
            </Head>
            <Container
                component="main"
                sx={{
                    px: { xs: 5, sm: 30, md: 15, lg: 30, xl: 40 },
                }}
            >
                <Box textAlign="center">
                    <Typography variant="h1">Kontakt</Typography>
                    <Typography mt="5%" variant="h5">
                        Masz pytanie napisz maila na adres:
                    </Typography>
                    <Typography mt="2.5%" variant="h5">
                        <a href="mailto:name@email.com">chelmscyemerycisw@gmail.com</a>
                    </Typography>
                    <Typography mt="5%" variant="h5">
                        Adres: <br />
                        Zarząd koła
                        <br /> 20-100 Chełm,
                        <br /> Polska ul. Kolejowa 112
                    </Typography>
                    <Typography mt="15%" variant="h5">
                        Autorem strony jest Jakub Marchwiany
                    </Typography>
                    <Typography mt="2.5%" variant="h5">
                        <a href="mailto:name@email.com">jakubmarchwiany@icloud.com</a>
                    </Typography>
                </Box>
            </Container>
        </>
    );
}
export default Contact;
