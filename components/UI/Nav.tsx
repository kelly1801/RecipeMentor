import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";
import Link from "next/link";

const Nav = () => {
  const { user } = useUser();
  return (
    <nav className="z-50 w-full bg-orange-50 fixed flex justify-between items-center p-4 shadow-sm shadow-slate-200 font-bold text-orange-300">
      <Link href={"/"}>
        <figure>
          <Image
            src={"/logo.png"}
            alt="recipe mentor logo"
            height={80}
            width={100}
          />
        </figure>
      </Link>

      {user ? (
        <ul className="nav-menu">
          <Link className="nav-menu-item" href="/recipe/generate">
            Generate
          </Link>
          <Link className="nav-menu-item" href="/">
            Home
          </Link>
          <Link className="btn" href="/api/auth/logout" role="button">
            Logout
          </Link>
        </ul>
      ) : (
        <ul className="nav-menu">
          <Link className="nav-menu-item" href="/recipe/generate">
            Generate
          </Link>
          <Link className="nav-menu-item" href="/">
            Home
          </Link>
          <Link className="btn" href="/api/auth/login" role="button">
            Login
          </Link>
        </ul>
      )}
    </nav>
  );
};

export default Nav;
