import { create } from "zustand";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useRecipeStore = create((set, get) => ({
  allRecipe: [],

  fetchRecipes: async () => {
    const res = await axios.get("http://localhost:5000/api/recipe");
    if (res.data.success) {
      const { recipes } = await res.json();
      set({ allRecipe: recipes });
    }
  },
}));
