'use client'

export default  function Button() {

  const handleSubmit = async () => {
    
    const ingredients = 'caviar, sugar, oil'

    try {
    
      const resp = await fetch("/api/recipes/generateRecipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ingredients }),
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