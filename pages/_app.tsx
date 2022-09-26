import { CacheProvider, EmotionCache } from "@emotion/react";
import { Box, Stack } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { AppProps } from "next/app";
import Head from "next/head";
import "../src/assets/styles.css";
import { theme } from "../src/assets/theme";
import createEmotionCache from "../src/utils/createEmotionCache";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Stack
          height="100vh"
          display="flex"
          flexDirection="column"
          className="background"
        >
          <Box
            component={"main"}
            id="scroller"
            flex={1}
            overflow="auto"
            color="primary.contrastText"
          >
            <Component {...pageProps} />
          </Box>
        </Stack>
      </ThemeProvider>
    </CacheProvider>
  );
}
