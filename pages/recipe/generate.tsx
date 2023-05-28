import { Layout } from "@/components";
import { useState, SyntheticEvent } from "react";
import { useRouter } from "next/router";
export default function Home() {
  const [{ingredients, loading}, setIngredients] = useState({ingredients: '', loading: false});
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setIngredients((prevState) => ({ ...prevState, ingredients: value }));
  };
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (!ingredients.trim().length) return;

   setIngredients((prevState) => ({ ...prevState, loading: true }))
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
      setIngredients((prevState) => ({ ...prevState, loading: false }))

      console.log(json);
    } catch (e) {
      setIngredients((prevState) => ({ ...prevState, loading: false }))

      console.error(e);
    }
  };

  return (
    <Layout>
      <section className="h-full w-full mx-auto flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-orange-200/40 flex flex-col gap-5 p-4 w-full mx-40 rounded-md"
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
            Let's cook
          </button>
        </form>
      </section>
    </Layout>
  );
}
