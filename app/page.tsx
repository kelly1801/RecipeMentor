import Image from "next/image";
import { UserProvider } from '@auth0/nextjs-auth0/client';

export default async function Home() {
  return (
    <UserProvider>
    
 
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      recipeMentor
      <a href="/api/auth/login">Login</a>
    </main>
    </UserProvider>
  );
}
