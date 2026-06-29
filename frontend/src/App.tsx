import { Routes, Route } from "react-router-dom";
import RecipeList from "./pages/RecipeList";
import RecipeDetail from "./pages/RecipeDetail";
import CreateRecipe from "./pages/CreateRecipe";

function App() {
  return (
    <Routes>
      <Route path="/" element={<RecipeList />} />
      <Route path="/recipes/:id" element={<RecipeDetail />} />
      <Route path="/new" element={<CreateRecipe />} />
    </Routes>
  );
}

export default App;