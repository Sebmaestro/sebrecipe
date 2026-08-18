import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import type { Recipe } from "../types";

function RecipeDetail() {
  const { id } = useParams();
  const { data, isLoading, error } = useQuery<Recipe>({
    queryKey: ["recipes", id],
    queryFn: () => fetch(`/api/recipes/${id}`, { credentials: "include" }).then((res) => res.json()),
  });

  return (
    <div className="p-12 max-w-2xl mx-auto">
      {isLoading && <p>Laddar...</p>}
      {error && <p className="text-red-600">Fel: {error.message}</p>}

      {data && (
        <>
          <Link to="/recipes" className="text-sm text-gray-500 hover:text-gray-900">
            ← Alla recept
          </Link>
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold">{data.name}</h1>
              {data.calories > 0 && (
                <p className="text-gray-500 mt-1">{data.calories} kcal</p>
              )}
            </div>
            <Link
              to={`/recipes/${id}/edit`}
              className="px-4 py-2 border border-gray-300 rounded text-sm hover:bg-gray-100"
            >
              Redigera
            </Link>
          </div>

          <h2 className="text-lg font-medium mb-2">Ingredienser</h2>
          <ul className="mb-8 space-y-1">
            {data.ingredients.map((ingredient, index) => (
              <li key={index} className="flex justify-between border-b border-gray-100 py-1">
                <span>{ingredient.name}</span>
                <span className="text-gray-500">
                  {ingredient.amount} {ingredient.unit}
                  {ingredient.price > 0 && ` - ${ingredient.price} kr`}
                </span>
              </li>
            ))}
          </ul>

          <h2 className="text-lg font-medium mb-2">Instruktioner</h2>
          <ol className="space-y-3 list-decimal list-inside">
            {data.instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>
        </>
      )}


    </div>
  );
}

export default RecipeDetail;
