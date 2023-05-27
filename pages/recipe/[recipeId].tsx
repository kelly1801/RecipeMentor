import { useDB } from "@/hooks/useDB";
import { Recipe } from "@/interface/types";
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { GetServerSideProps} from "next";
import { Layout } from "@/components";
import { ObjectId } from "mongodb";
import Image from "next/image";

interface RecipeDetailsProps {
  recipe: Recipe;
}

const RecipeDetails = ({ recipe }: RecipeDetailsProps) => {

  return (<Layout>
    <figure  className="w-full h-3/5  bg-orange-200 mx-auto flex">
    <Image
   className="w-full object-cover "
 src={recipe.image_url}
 alt={recipe.ingredients}
 width={1012}
 height={312}   
    />
    </figure>
   
    <section className="h-full p-8 " dangerouslySetInnerHTML={{ __html: recipe.recipeContent || "" }}></section>
  </Layout>);
};

export const getServerSideProps: GetServerSideProps = withPageAuthRequired({
    async getServerSideProps(ctx) {
      const { recipeId } = ctx.query;
      const session = await getSession(ctx.req, ctx.res);
  
      const { recipesCollection, userProfile } = await useDB(session?.user.sub);
  
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
  
      return {
        props: {
          recipeId: recipeId as string,
          recipe: plainRecipe,
        },
      };
    },
  });
  


export default RecipeDetails;
