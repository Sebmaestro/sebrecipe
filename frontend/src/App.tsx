import { Routes, Route } from "react-router-dom";
import RecipeList from "./pages/RecipeList";
import RecipeDetail from "./pages/RecipeDetail";
import CreateRecipe from "./pages/CreateRecipe";
import EditRecipe from "./pages/EditRecipe";

function App() {
  return (
    <Routes>
      <Route path="/" element={<RecipeList />} />
      <Route path="/recipes/:id" element={<RecipeDetail />} />
      <Route path="/new" element={<CreateRecipe />} />
      <Route path="/recipes/:id/edit" element={<EditRecipe />} />
    </Routes>
  );
}

export default App;