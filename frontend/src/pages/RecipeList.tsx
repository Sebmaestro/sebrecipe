import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Recipe } from "../types";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

function RecipeList() {
  const { data, isLoading, error } = useQuery<Recipe[]>({
    queryKey: ["recipes"],
    queryFn: () => fetch("/api/recipes", { credentials: "include" }).then((res) => res.json()),
  });

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { refresh } = useAuth();

  const logout = useMutation({
    mutationFn: () =>
      fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      }),
    onSuccess: () => {
      queryClient.clear();
      refresh();
      navigate("/login");
    },
  });

  return (
    <div className="p-12 max-w-2xl mx-auto">
      {isLoading && <p>Laddar...</p>}
      {error && <p className="text-red-600">Fel: {error.message}</p>}

      {data && (
        <>
          <button
            onClick={() => logout.mutate()}
            className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-100"
          >
            Logga ut
          </button>
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Recept</h1>
            <Link
              to="/new"
              className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
            >
              + Nytt recept
            </Link>
          </div>

          {data.length === 0 ? (
            <p className="text-gray-500">Inga recept än. Skapa ditt första!</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {data.map((recipe) => (
                <li key={recipe.id}>
                  <Link
                    to={`/recipes/${recipe.id}`}
                    className="flex items-center justify-between py-3 hover:bg-gray-50 px-2 -mx-2 rounded"
                  >
                    <span className="font-medium">{recipe.name}</span>
                    {recipe.calories > 0 && (
                      <span className="text-sm text-gray-500">{recipe.calories} kcal</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}

export default RecipeList;
