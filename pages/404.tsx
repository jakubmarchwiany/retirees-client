import { Home } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { NextPage } from "next";
import Head from "next/head";

import MyLinkButton from "../src/components/my/MyLinkButton";

const NotFound: NextPage = () => {
  return (
    <>
      <Head>
        <title>Brak strony</title>
        <meta
          name="description"
          content="Strona o podanym adresie nie istnieje"
        />
      </Head>
      <Box mt={15} textAlign="center">
        <Typography variant="h4">Ta strona jest niedostępna</Typography>
        <Typography mt={10} mb={5} variant="h5">
          Link może być uszkodzony lub strona mogła zostać usunięta.
          <br /> Sprawdź, czy link, który próbujesz otworzyć, jest poprawny.
        </Typography>

        <MyLinkButton
          isActive={false}
          href="/"
          text="Powrót do strony głównej"
          Icon={Home}
        />
      </Box>
    </>
  );
};
export default NotFound;
