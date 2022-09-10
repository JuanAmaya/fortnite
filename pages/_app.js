import { ChakraProvider, CSSReset, extendTheme } from "@chakra-ui/react";
import NextNProgress from "nextjs-progressbar";
import "../styles/globals.css";

const theme = extendTheme({
  styles: {
    global: () => ({
      body: {
        bg: "#18191a",
      },
    }),
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <NextNProgress color="#28597C" />
      <CSSReset />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
