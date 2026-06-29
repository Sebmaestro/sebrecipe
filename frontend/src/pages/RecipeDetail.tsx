import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import type { Recipe } from "../types";

function RecipeDetail() {
  const { id } = useParams();
  const { data, isLoading, error } = useQuery<Recipe>({
    queryKey: ["recipes", id],
    queryFn: () => fetch(`/api/recipes/${id}`).then((res) => res.json()),
  });

  return (
    <div className="p-12 max-w-2xl mx-auto">
      {isLoading && <p>Laddar...</p>}
      {error && <p>Fel: {error.message}</p>}
      <h2>{data?.name}</h2>
      <h3>Ingredienser:</h3>
      {data?.ingredients.map((ingredient, index) => (
        <p key={index}>
          {ingredient.amount} {ingredient.unit} {ingredient.name}(
          {ingredient.calorie} kcal, {ingredient.price} kr)
        </p>
      ))}
      <h3>Instruktioner:</h3>
      {data?.instructions.map((instruction, index) => (
        <p key={index}>{instruction}</p>
      ))}
    </div>
  );
}

export default RecipeDetail;
