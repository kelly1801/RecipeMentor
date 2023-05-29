import { useUser } from "@auth0/nextjs-auth0/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { Recipe } from "@/interface/types";

import Image from "next/image";
import Link from "next/link";

import RecipeContext from "@/context/recipeContext";
interface SidebarProps {
  recipes: Recipe[];
}

const Sidebar = ({ recipes }: SidebarProps) => {
  const { isVisible, showSidebar } = useContext(RecipeContext);
  const { user } = useUser();
  return (
    <>
      {!isVisible ? (
        <aside className="z-20 bg-orange-200/70 h-[calc(100vh-4.7rem)] max-h-[calc(100vh-4.7rem)] max-w-[8%] flex flex-col justify-between">
          <FontAwesomeIcon
            icon={faChevronRight}
            onClick={() => showSidebar()}
            className="cursor-pointer self-end p-2"
          />
        </aside>
      ) : (
        <aside className="z-20 w-full bg-orange-200/70 h-[calc(100vh-4.7rem)] max-h-[calc(100vh-4.7rem)] lg:max-w-[25%] lg:w-[25%] flex flex-col justify-between">
          <div className="flex flex-col justify-between py-4 px-2 gap-2 overflow-auto">
            <FontAwesomeIcon
              icon={faChevronLeft}
              onClick={() => showSidebar()}
              className="cursor-pointer self-end p-2"
            />

            {recipes.length ? (
              recipes.map((recipe) => (
                <Link
                  className="gap-2 bg-orange-400 text-ellipsis overflow-hidden whitespace-nowrap font-bold text-white p-2 rounded-sm"
                  key={recipe._id}
                  href={`/recipe/${recipe._id}`}
                >
                  {recipe.title}
                </Link>
              ))
            ) : (
              <p className="bg-orange-400 font-bold text-white p-2 rounded-sm">
                No recipes yet
              </p>
            )}
          </div>

          <div className="p-2 border-t  border-orange-300">
            <figure className="flex gap-3 justify-between">
              <Image
                className="rounded-full"
                src={user?.picture!}
                alt={user?.email!}
                width={50}
                height={50}
              />

              <figcaption className="flex flex-col">
                <span>{user?.name}</span>
                <a className="hover:underline font-bold text-right">logout</a>
              </figcaption>
            </figure>
          </div>
        </aside>
      )}
    </>
  );
};

export default Sidebar;
