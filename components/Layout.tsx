import Nav from "./UI/Nav";
import { Recipe } from "@/interface/types";

export const metadata = {
  title: "Recipe Mentor",
  description: " discover delicious recipes based on the ingredients you have on hand",
};

interface LayoutProps {
  children: React.ReactNode,
  recipes?: Recipe[]
}
const Layout = ({ children, recipes }: LayoutProps) => {
  return (
    <>
      <Nav />
      <main className="bg-orange-100/10 h-screen pt-[4.2rem] max-h-screen overflow-hidden">{children}</main>
    </>
  );
};


export default Layout