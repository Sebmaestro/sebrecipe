export type Recipe = {
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
