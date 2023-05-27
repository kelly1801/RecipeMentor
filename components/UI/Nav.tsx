import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";

const Nav = () => {
  const { user } = useUser();
  return (
    <nav className="bg-orange-50 z-10 flex justify-between content-center  p-4 shadow-sm shadow-slate-200 font-bold text-orange-300">
      <figure className="">
        <Image
          src={"/logo.png"}
          alt="recipe mentor logo"
          height={80}
          width={100}
        />
      </figure>

      {user ? (
        <ul className="nav-menu">
          <li className="nav-menu-item">Generate</li>
          <li className="nav-menu-item">Home</li>
          <a className="btn" href="/api/auth/logout" role="button">Logout</a>
        </ul>
      ) : (
        <ul className="nav-menu">
          <li className="nav-menu-item">Generate</li>
          <li className="nav-menu-item">Home</li>
          <a className="btn" href="/api/auth/login" role="button">Login</a>
        </ul>
      )}
    </nav>
  );
};

export default Nav;
