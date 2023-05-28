import { Layout } from "@/components";
import { useState, SyntheticEvent } from "react";
import { useRouter } from "next/router";
import { Sidebar } from "@/components/";
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { GetServerSideProps } from "next";
import { Recipe } from "@/interface/types";
import { getDB } from "@/utils/getDB";

interface SidebarProps {
  recipes: Recipe[];
}
export default function Generate({ recipes }: SidebarProps) {
  const [{ ingredients, loading }, setIngredients] = useState({
    ingredients: "",
    loading: false,
  });
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setIngredients((prevState) => ({ ...prevState, ingredients: value }));
  };
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (!ingredients.trim().length) return;

    setIngredients((prevState) => ({ ...prevState, loading: true }));
    try {
      const resp = await fetch("/api/recipes/generateRecipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ingredients }),
      });

      const json = await resp.json();
      if (json?.recipeId) {
        router.push(`/recipe/${json.recipeId}`);
      }
      setIngredients((prevState) => ({ ...prevState, loading: false }));

      console.log(json);
    } catch (e) {
      setIngredients((prevState) => ({ ...prevState, loading: false }));

      console.error(e);
    }
  };

  return (
    <Layout>
      <div className="flex">
        <Sidebar recipes={recipes} />
        <section className="flex justify-center items-center w-full">
          <form
            onSubmit={handleSubmit}
            className="animate__animated animate__slideInDown bg-orange-200/40 mx-40  w-full flex flex-col gap-5 p-4 rounded-md"
          >
            <label className="text-center  text-2xl">
              What ingredients you have?
            </label>
            <textarea
              className="resize-none h-16 p-1"
              placeholder="put ingredients separated by a comma ex: 'chicken, tomatoes, rice'"
              value={ingredients}
              onChange={handleInputChange}
            />
            <button disabled={loading} type="submit" className="btn">
              Let&apos;s cook
            </button>
          </form>
        </section>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const session = await getSession(ctx.req, ctx.res);

    const { recipesCollection, userProfile } = await getDB(session?.user.sub);

    const recipes = await recipesCollection
      .find({
        userId: userProfile?._id,
      })
      .toArray();

    // Convert the recipe object to a plain JavaScript object
    const plainRecipes = JSON.parse(JSON.stringify(recipes));

    return {
      props: {
        recipes: plainRecipes,
      },
    };
  },
});
