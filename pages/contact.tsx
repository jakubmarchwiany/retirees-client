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
                    <Typography mt={10} mb={5} variant="h5">
                        Masz pytanie napisz maila na adres:
                        <br />
                        <br />
                        <a href="mailto:name@email.com">chelmscyemerycisw@gmail.com</a>
                        <br />
                        <br />
                        <br />
                        Adres:

                        <br /> Zarząd koła
                        <br /> 20-100 Chełm, Polska
                        <br /> ul. Kolejowa 112
                        <br />
                        <br />
                        <br />
                        <br />
                        <br /> Autorem strony jest Jakub Marchwiany
                        <br />
                        <a href="mailto:name@email.com">jacobmarchwiany@gmail.com</a>
                    </Typography>
                </Box>
            </Container>
        </>
    );
}
export default Contact;
