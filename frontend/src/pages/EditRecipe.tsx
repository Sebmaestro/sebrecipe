import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Recipe, Ingredient } from "../types";
import { useState, useEffect } from "react";


function EditRecipe() {
    const queryClient = useQueryClient();
    const [instructions, setInstructions] = useState<string[]>([]);
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [calories, setCalories] = useState<number | "">("");
    const [name, setName] = useState("");
    const { id } = useParams();
    const { data, isLoading, error } = useQuery<Recipe>({
        queryKey: ["recipes", id],
        queryFn: () => fetch(`/api/recipes/${id}`, { credentials: "include" }).then((res) => res.json()),
    });

    const navigate = useNavigate();


    useEffect(() => {
        if (data) {
            setName(data.name);
            setCalories(data.calories);
            setIngredients(data.ingredients);
            setInstructions(data.instructions);
        }
    }, [data]);

    const mutation = useMutation({
        mutationFn: (updated: Recipe) =>
            fetch(`/api/recipes/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(updated),
            }).then((res) => res.json()),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["recipes"] });
            navigate(`/recipes/${id}`);
        },
    });

    const addStep = () => setInstructions([...instructions, ""]);

    const updateStep = (index: number, value: string) => {
        const copy = [...instructions];
        copy[index] = value;
        setInstructions(copy);
    };

    const addIngredient = () =>
        setIngredients([...ingredients, { name: "", amount: 0, unit: "", price: 0 }]);

    const updateIngredient = (
        index: number,
        field: keyof Ingredient,
        value: string | number,
    ) => {
        const copy = [...ingredients];
        copy[index] = { ...copy[index], [field]: value };
        setIngredients(copy);
    };

    //Remove the one that we clicked on
    const removeStep = (index: number) =>
        setInstructions(instructions.filter((_, i) => i !== index));

    const removeIngredient = (index: number) =>
        setIngredients(ingredients.filter((_, i) => i !== index));

    return (
        <div className="p-12 max-w-2xl mx-auto flex flex-col gap-2">
            {isLoading && <p>Laddar...</p>}
            {error && <p>Fel: {error.message}</p>}
            <h1 className="text-2xl font-bold mb-4">Redigera recept</h1>

            <label className="flex flex-col gap-1">
                <span className="text-sm text-gray-600">Receptnamn</span>
                <input
                    className="border border-gray-300 rounded px-2 py-1"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </label>
            <label className="flex flex-col gap-1">
                <span className="text-sm text-gray-600">Kalorier</span>
                <input
                    className="border border-gray-300 rounded px-2 py-1"
                    type="number"
                    value={calories}
                    onChange={(e) => setCalories(Number(e.target.value))}
                />
            </label>
            <h2 className="text-lg font-medium mt-6 mb-2">Ingredienser</h2>
            <div className="flex gap-2 text-sm text-gray-600">
                <span className="w-40">Namn</span>
                <span className="w-24">Mängd</span>
                <span className="w-24">Enhet</span>
                <span className="w-24">Pris</span>
                <span className="w-8"></span>
            </div>
            {ingredients.map((ingredient, index) => (
                <div key={index} className="flex gap-2">
                    <input
                        className="border border-gray-300 rounded px-2 py-1 w-40"
                        value={ingredient.name}
                        onChange={(e) => updateIngredient(index, "name", e.target.value)}
                        placeholder="Ingrediensnamn"
                    />

                    <input
                        className="border border-gray-300 rounded px-2 py-1 w-24"
                        type="number"
                        value={ingredient.amount}
                        onChange={(e) => updateIngredient(index, "amount", Number(e.target.value))}
                        placeholder="Mängd"
                    />

                    <input
                        className="border border-gray-300 rounded px-2 py-1 w-24"
                        value={ingredient.unit}
                        onChange={(e) => updateIngredient(index, "unit", e.target.value)}
                        placeholder="Enhet"
                    />

                    <input
                        className="border border-gray-300 rounded px-2 py-1 w-24"
                        type="number"
                        value={ingredient.price}
                        onChange={(e) => updateIngredient(index, "price", Number(e.target.value))}
                        placeholder="Pris"
                    />

                    <button
                        type="button"
                        onClick={() => removeIngredient(index)}
                        className="px-2 text-gray-400 hover:text-red-600"
                    >
                        ✕
                    </button>

                </div>
            ))}
            <button className="px-3 py-1 border border-gray-400 rounded text-sm hover:bg-gray-100" type="button" onClick={addIngredient}>+ Lägg till ingrediens</button>
            <hr className="my-6 border-gray-300" />

            <h2 className="text-lg font-medium mb-2">Instruktioner</h2>
            {instructions.map((step, index) => (
                <div key={index} className="flex gap-2">
                    <input
                        className="border border-gray-300 rounded px-2 py-1 flex-1"
                        value={step}
                        onChange={(e) => updateStep(index, e.target.value)}
                        placeholder={`Steg ${index + 1}`}
                    />
                    <button
                        type="button"
                        onClick={() => removeStep(index)}
                        className="px-2 text-gray-400 hover:text-red-600"
                    >
                        ✕
                    </button>
                </div>
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
                onClick={() => data && mutation.mutate({ ...data, name, calories: calories === "" ? 0 : calories, ingredients, instructions })}
            >
                Spara
            </button>




        </div>
    );
}

export default EditRecipe;