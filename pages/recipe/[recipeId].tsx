import { getDB } from "@/utils/getDB";
import { Recipe } from "@/interface/types";
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { GetServerSideProps } from "next";
import { Layout } from "@/components";
import { ObjectId } from "mongodb";
import { Sidebar } from "@/components/";
import { useState, useContext } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import RecipeContext from "@/context/recipeContext";
import Overlay from "../../components/UI/Overlay";

interface RecipeDetailsProps {
  recipe: Recipe;
  recipes: Recipe[];
}

const RecipeDetails = ({ recipe, recipes }: RecipeDetailsProps) => {
  const [deletion, setDeletion] = useState(false);
  const { isVisible } = useContext(RecipeContext);

  const router = useRouter();
  const handleDeletion = async (recipeId: string) => {
    const resp = await fetch("/api/recipes/deleteRecipe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ recipeId }),
    });

    const json = await resp.json();
    if (json.success) {
      router.replace("/recipe/generate");
    }
    console.log(json);
    return json;
  };
  return (
    <Layout>
      <section className="flex h-screen max-h-full">
        <Sidebar recipes={recipes} />


        <div className="overflow-auto">
          <figure className="w-full  h-1/5 md:h-3/5  bg-orange-200 mx-auto flex">
            <Image
              className="w-full object-cover "
              src={recipe.image_url}
              alt={recipe.ingredients}
              width={1012}
              height={312}
            />
          </figure>

          <article
            className="overflow-x-hidden"
            dangerouslySetInnerHTML={{ __html: recipe.recipeContent || "" }}
          ></article>

          <div className="flex gap-2 p-4 ">
            {deletion ? (
              <>
                <button
                  className="btn-cancel"
                  onClick={() => setDeletion(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn-delete"
                  onClick={() => handleDeletion(recipe._id)}
                >
                  Delete
                </button>
              </>
            ) : (
              <button className="btn-delete" onClick={() => setDeletion(true)}>
                Delete
              </button>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const { recipeId } = ctx.query;
    const session = await getSession(ctx.req, ctx.res);

    const { recipesCollection, userProfile } = await getDB(session?.user.sub);

    const recipes = await recipesCollection
      .find({
        userId: userProfile?._id,
      })
      .toArray();

    if (!recipeId) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    const recipe = await recipesCollection.findOne({
      _id: new ObjectId(recipeId as string),
      userId: userProfile?._id,
    });

    if (!recipe) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    // Convert the recipe object to a plain JavaScript object
    const plainRecipe = JSON.parse(JSON.stringify(recipe));
    const plainRecipes = JSON.parse(JSON.stringify(recipes));

    return {
      props: {
        recipeId: recipeId as string,
        recipe: plainRecipe,
        recipes: plainRecipes,
      },
    };
  },
});

export default RecipeDetails;
