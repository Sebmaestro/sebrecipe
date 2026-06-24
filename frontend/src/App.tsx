import { useQuery } from "@tanstack/react-query";

type Recipe = {
  id: number;
  name: string;
  ingredients: {
    name: string;
    amount: number;
    unit: string;
    calorie: number;
    price: number;
  }[];
  instructions: string[];
  calories: number;
  price: number;
};

function App() {
  const { data, isLoading, error } = useQuery<Recipe[]>({
    queryKey: ["recipes"],
    queryFn: () => fetch("/api/recipes").then((res) => res.json()),
  });

  return (
    <div className="p-12 max-w-2xl mx-auto">
      {isLoading && <p>Laddar...</p>}
      {error && <p>Fel: {error.message}</p>}
      <ul>
        {data?.map((recipe) => (
          <li key={recipe.id}>{recipe.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
