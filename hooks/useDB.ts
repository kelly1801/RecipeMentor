import connectDB from "../lib/connect-db";

export const useDB = async (auth0Id: string) => {
  const client = await connectDB
  const db = client.db('RecipeMentor')
  const usersCollection = db.collection("users")
  const recipesCollection = db.collection("recipes")
  const userProfile = await usersCollection.findOne({ auth0Id });

  return {
   db,
   usersCollection,
   recipesCollection,
   userProfile
  };

};

