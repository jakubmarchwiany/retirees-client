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
                        Znalazłeś błąd lub masz pytanie.
                        <br /> Napisz mail.
                        <br /> Staram sie odpisywać jak najszybciej
                        <br />
                        <br />
                        <br /> Chełmscy emeryci
                        <br /> 20-100 Chełm, Polska
                        <br />
                        <a href="mailto:name@email.com">???@gmail.com</a>
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
