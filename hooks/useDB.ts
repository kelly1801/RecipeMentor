import connectDB from "../lib/connect-db";

export const useDB = async () => {
  const client = await connectDB
  const db = client.db('RecipeMentor')
  const usersCollection = db.collection("users")
  const recipesCollection = db.collection("recipes")

  return {
   db,
   usersCollection,
   recipesCollection
  };

};

