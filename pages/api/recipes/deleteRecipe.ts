import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { ObjectId } from "mongodb";
import { useDB } from "@/hooks/useDB";

export default withApiAuthRequired(async function handler(req, res) {
  const session = await getSession(req, res);
  const { userProfile, recipesCollection } = await useDB(session?.user.sub);
  try {
    const { recipeId } = req.body;
    await recipesCollection.deleteOne({
      userId: new ObjectId(userProfile?._id),
      _id: new ObjectId(recipeId),
    });

    res.status(200).json({ success: true });
  } catch (e) {
    console.log("Error deleting a post", e);
  }
  return;
});
