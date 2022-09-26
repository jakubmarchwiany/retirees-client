import { Box, Typography } from "@mui/material";
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
      <Box mt={15} textAlign="center">
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
    </>
  );
}
export default Contact;
