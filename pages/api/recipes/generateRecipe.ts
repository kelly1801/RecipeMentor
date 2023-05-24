import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";
import { useDB } from "@/hooks/useDB";

export default withApiAuthRequired(async function handler(req, res) {
  const session = await getSession(req, res);

  const { usersCollection, recipesCollection, userProfile } = await useDB(session?.user.sub);


  const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(config);

  const { ingredients } = req.body;
  if (!ingredients) {
    res.status(422).end();
    return;
  }

  if (ingredients.length > 80) {
    res.status(422).end();
    return;
  }

  const commonMessages: ChatCompletionRequestMessage[] = [
    {
      role: "system",
      content: "You are a recipe generator",
    },
    {
      role: "user",
      content: `Write a long and detailed recipe with a title only with the following comma-separated ingredients ${ingredients}, The content should be formatted in HTML and limited to the following HTML tags: p, h2, h3, h4, h5, h6, strong, li, ol, ul, i, dont include metatag like the doctype, meta, doctype or the html tag.`,
    },
  ];

  const recipeResponse = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    temperature: 0,
    messages: commonMessages,
  });

  const recipeContent = recipeResponse.data.choices[0]?.message?.content || "";

  // Check if the user exists
 

  if (!userProfile) {
    // Create a new user document
    const newUserProfile = {
      auth0Id: session?.user.sub,
      savedRecipes: 1, // Set the initial savedRecipes count
    };

    // Insert the new user document
    await usersCollection.insertOne(newUserProfile);
  }

  // Update the existing user's savedRecipes count
  await usersCollection.updateOne(
    { auth0Id: session?.user.sub },
    { $inc: { savedRecipes: 1 } }
  );

  // Retrieve the updated user document
  const updatedUserProfile = await usersCollection.findOne({
    auth0Id: session?.user.sub,
  });

  // Insert the recipe document
  const recipe = await recipesCollection.insertOne({
    recipeContent,
    ingredients,
    created: new Date(),
    userId: updatedUserProfile?._id,
  });

  res.status(200).json({ recipeId: recipe.insertedId });
});
