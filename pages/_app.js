import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import NextNProgress from "nextjs-progressbar";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <NextNProgress color="#6A47C4" />
      <CSSReset />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
