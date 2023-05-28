import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { getDB } from "@/utils/getDB";

export default withApiAuthRequired(async function handler(req, res) {
  const session = await getSession(req, res);

  const { userProfile, usersCollection, recipesCollection } = await getDB(
    session?.user.sub
  );
  try {
    const recipes = await recipesCollection
      .find({
        userId: userProfile?._id,
      })
      .sort({ created: -1 })
      .toArray();

    res.status(200).json({ recipes });
    return;
  } catch (e) {
    console.log(e);
  }
});
