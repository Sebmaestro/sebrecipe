export type Ingredient = {
  name: string;
  amount: number;
  unit: string;
  price: number;
};

export type Recipe = {
  id: number;
  name: string;
  ingredients: Ingredient[];   
  instructions: string[];
  calories: number;
  price: number;
};