import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Ingredient } from "../types";

function CreateRecipe() {
  const [name, setName] = useState("");
  const queryClient = useQueryClient();
  //const [calories, setCalories] = useState(0);
  //const [price, setPrice] = useState(0);
  const [instructions, setInstructions] = useState<string[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  const mutation = useMutation({
    mutationFn: (newRecipe: {
      name: string;
      instructions: string[];
      ingredients: Ingredient[];
    }) =>
      fetch("/api/recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRecipe),
      }).then((res) => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
    },
  });

  const addStep = () => setInstructions([...instructions, ""]);

  const updateStep = (index: number, value: string) => {
    const copy = [...instructions];
    copy[index] = value;
    setInstructions(copy);
  };

  const addIngredient = () =>
    setIngredients([
      ...ingredients,
      { name: "", amount: 0, unit: "", calorie: 0, price: 0 },
    ]);

  const updateIngredient = (
    index: number,
    field: keyof Ingredient,
    value: string | number,
  ) => {
    const copy = [...ingredients];
    copy[index] = { ...copy[index], [field]: value };
    setIngredients(copy);
  };

  const inputClass = "border border-gray-300 rounded px-2 py-1";

  return (
    <div className="p-12 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Skapa nytt recept</h1>
      <form
        className="flex flex-col gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          mutation.mutate({ name, instructions, ingredients });
        }}
      >
        <input
          className={inputClass}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Receptnamn"
        />

        {ingredients.map((ingredient, index) => (
          <div key={index} className="flex gap-2">
            <input
              className={inputClass}
              value={ingredient.name}
              onChange={(e) => updateIngredient(index, "name", e.target.value)}
              placeholder="ingrediens"
            />

            <input
              className={inputClass}
              value={ingredient.amount}
              type="number"
              onChange={(e) =>
                updateIngredient(index, "amount", Number(e.target.value))
              }
              placeholder="mängd"
            />

            <input
              className={inputClass}
              value={ingredient.unit}
              onChange={(e) => updateIngredient(index, "unit", e.target.value)}
              placeholder="enhet"
            />
          </div>
        ))}

        <button
          className="px-3 py-1 border border-gray-400 rounded text-sm hover:bg-gray-100"
          type="button"
          onClick={addIngredient}
        >
          + Lägg till ingrediens
        </button>

        {instructions.map((step, index) => (
          <input
            className={inputClass}
            key={index}
            value={step}
            onChange={(e) => updateStep(index, e.target.value)}
            placeholder={`Steg ${index + 1}`}
          />
        ))}

        <button
          className="px-3 py-1 border border-gray-400 rounded text-sm hover:bg-gray-100"
          type="button"
          onClick={addStep}
        >
          + Lägg till steg
        </button>

        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          type="submit"
        >
          Spara
        </button>
      </form>
    </div>
  );
}

export default CreateRecipe;
