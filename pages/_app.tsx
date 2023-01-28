import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { AnimatePresence } from "framer-motion";
import ContainerWrapper from "../components/ContainerWrapper";

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <ContainerWrapper>
        <AnimatePresence mode="wait">
          <Component {...pageProps} key={router.route}/>
        </AnimatePresence>
      </ContainerWrapper>
    </ThemeProvider>
  );
}
