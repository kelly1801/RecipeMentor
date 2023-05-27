import { useDB } from "@/hooks/useDB";
import { Recipe } from "@/interface/types";
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { GetServerSideProps } from "next";
import { Layout } from "@/components";
import { ObjectId } from "mongodb";
import Image from "next/image";
import Sidebar from "@/components/UI/Sidebar";

interface RecipeDetailsProps {
  recipe: Recipe;
  recipes: Recipe[];
}

const RecipeDetails = ({ recipe, recipes }: RecipeDetailsProps) => {
  return (
    <Layout>
      <section className="flex h-[calc(100vh-5rem)] max-h-[calc(100vh-5rem)]">
        <Sidebar recipes={recipes} />

        <div className="overflow-auto">
          <figure className="w-full h-3/5  bg-orange-200 mx-auto flex">
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
        </div>
      </section>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const { recipeId } = ctx.query;
    const session = await getSession(ctx.req, ctx.res);

    const { recipesCollection, userProfile } = await useDB(session?.user.sub);

    const recipes = await recipesCollection
      .find({
        userId: userProfile?._id,
      })
      .toArray();

    if (recipes.length === 0) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
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
