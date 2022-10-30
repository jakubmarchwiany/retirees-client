import { Home } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { NextPage } from "next";
import Head from "next/head";

import MyLinkButton from "../src/components/my/MyLinkButton";

const NotFound: NextPage = () => {
    return (
        <>
            <Head>
                <title>Strona nie znaleziona</title>
                <meta name="description" content="Strona nie znaleziona." />
            </Head>
            <Container
                component="main"
                sx={{
                    px: { xs: 1, sm: 10, md: 5, lg: 15, xl: 20 },
                }}
            >
                <Box textAlign="center" mt={5}>
                    <Typography variant="h3">Ta strona jest niedostępna</Typography>
                    <Typography mt={"10%"} mb={5} variant="h5">
                        Link może być uszkodzony lub strona mogła zostać usunięta.
                        <br /> Sprawdź, czy link, który próbujesz otworzyć, jest poprawny.
                    </Typography>

                    <MyLinkButton
                        text="Powrót do strony głównej"
                        href="/"
                        isActive={false}
                        size="large"
                        Icon={Home}
                    />
                </Box>
            </Container>
        </>
    );
};
export default NotFound;
