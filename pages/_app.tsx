import "../styles/globals.css";
import "animate.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { AppProps } from "next/app";
import { RecipeProvider } from "@/context/recipeContext";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";

config.autoAddCss = false;

function MyApp({ Component, pageProps }: AppProps) {
  const getLayout =
    (Component as any).getLayout || ((page: JSX.Element) => page);
  return (
    <UserProvider>
      <RecipeProvider>
        <main>{getLayout(<Component {...pageProps} />, pageProps)}</main>
      </RecipeProvider>
    </UserProvider>
  );
}

export default MyApp;
