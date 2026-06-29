import { useQuery } from "@tanstack/react-query";
import type { Recipe } from "../types";
import { Link } from "react-router-dom";

function RecipeList() {
  const { data, isLoading, error } = useQuery<Recipe[]>({
    queryKey: ["recipes"],
    queryFn: () => fetch("/api/recipes").then((res) => res.json()),
  });

  return (
    <div className="p-12 max-w-2xl mx-auto">
      {isLoading && <p>Laddar...</p>}
      {error && <p>Fel: {error.message}</p>}
      {!isLoading && !error &&<h1 className="text-2xl font-bold mb-4">Recept</h1>}
      <ul>
        {data?.map((recipe) => (
          <li key={recipe.id}>
            <Link to={`/recipes/${recipe.id}`}>{recipe.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecipeList;
