'use client'

export default  function Button() {

  const handleSubmit = async () => {
    
    const recipeId = '646e6b722d6bf60d871b26f4'

    try {
    
      const resp = await fetch("/api/recipes/deleteRecipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ recipeId }),
      });
      

      const json = await resp.json();
      console.log(json)
    } catch (e) {
      console.error(e)
    }
  };

  return (
  
    <button onClick={handleSubmit}>Generate recipe</button>
    
  );
}