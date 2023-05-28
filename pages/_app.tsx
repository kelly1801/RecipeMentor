import "../styles/globals.css";
import "animate.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { AppProps } from "next/app";
import { RecipeProvider } from "@/context/recipeContext";


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
