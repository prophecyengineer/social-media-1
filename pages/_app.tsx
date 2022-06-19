import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Wrapper from "./components/Wrapper";

function MyApp({ Component, pageProps }) {
  console.log("got pageProps", pageProps);

  console.log("got pageProps.session", pageProps.session);
  return (
    <SessionProvider session={pageProps.session}>
      <Wrapper>
        <Component {...pageProps} />
      </Wrapper>
    </SessionProvider>
  );
}

export default MyApp;
