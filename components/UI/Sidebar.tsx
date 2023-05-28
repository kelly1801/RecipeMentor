import { Recipe } from "@/interface/types";
import React from "react";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";

interface SidebarProps {
  recipes: Recipe[];
}

const Sidebar = ({ recipes }: SidebarProps) => {
  const { user } = useUser();
  return (
    <aside className="bg-orange-200/70 h-[calc(100vh-4.7rem)] w-3/12 min-w-[25%] flex flex-col justify-between">
      <div className="flex flex-col justify-between py-4 px-2 gap-2 overflow-auto">
       
        {recipes.length ?
          recipes.map((recipe) => (
            <Link
              className="gap-2 bg-orange-400 text-ellipsis overflow-hidden whitespace-nowrap font-bold text-white p-2 rounded-sm"
              key={recipe._id}
              href={`/recipe/${recipe._id}`}
            >
              {recipe.title}
            </Link>
          )) :
        <p className="bg-orange-400 font-bold text-white p-2 rounded-sm">No recipes yet</p>
        }
      </div>

      <div className="p-2 border-t border-orange-500">
        <figure className="flex gap-2">
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
  );
};

export default Sidebar;
