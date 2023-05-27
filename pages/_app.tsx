import "../styles/globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { AppProps } from "next/app";


function MyApp({ Component, pageProps }: AppProps) {
  const getLayout = (Component as any).getLayout || ((page: JSX.Element) => page);
  return (
    <UserProvider>
      <main>
        {getLayout(<Component {...pageProps} />, pageProps)}
      </main>
    </UserProvider>
  );
}

export default MyApp;
