import Image from "next/image";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import Button from "../components/UI/generateButton";
import { Layout } from "@/components";
export default function Home() {
  return (
    <Layout>
 <section className="flex min-h-screen flex-col items-center justify-between p-24">
      recipeMentor
      <a href="/api/auth/login">Login</a>
      <Button />
    </section>
    </Layout>
   
  );
}
