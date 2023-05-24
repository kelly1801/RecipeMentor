import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { useDB } from "@/hooks/useDB";
import { ObjectId } from "mongodb";

export default withApiAuthRequired(async function handler(req, res) {
  const session = await getSession(req, res);

  const recipeId = req.query.recipeId?.toString();

  const { userProfile, recipesCollection } = await useDB(session?.user.sub);

  try {
    const recipe = await recipesCollection.findOne({
      _id: new ObjectId(recipeId),
      userId: new ObjectId(userProfile?._id),
    });

    res.status(200).json({ recipe });
  } catch (error) {
    console.error(error);
  }
});
