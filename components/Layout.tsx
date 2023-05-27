import Nav from "./UI/Nav";
import Sidebar from "./UI/Sidebar";
export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Nav />
      <main className="bg-orange-100/10 h-[calc(100vh-5rem)]">{children}</main>
    </>
  );
};



export default Layout;
