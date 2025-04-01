import { create } from "zustand";
import axios from "axios";

const api = [
  "https://recipe-dpvf.onrender.com/recipes/get",
  "http://localhost:5000/recipes/get",
];

const url = api[0];

export const useRecipeStore = create((set, get) => ({
  allRecipes: [],
  randomRecipes: [],
  searchedRecipes: [],
  ingredientRecipes: [],
  recipe: null,
  error: "",

  clearSearchedRecipes: () => {
    set({ searchedRecipes: [] });
  },

  clearRandomRecipes: () => {
    set({ randomRecipes: [] });
  },

  clearIngredientRecipes: () => {
    set({ ingredientRecipes: [] });
  },

  clearAllRecipes: () => {
    set({ allRecipes: [] });
  },

  setError: (message) => {
    set({ error: message });
  },

  fetchSingleRecipe: async (id) => {
    try {
      const res = await axios.get(`${url}?id=${id}`);
      if (!res.data.success) {
        set({ error: res.data.message });
      }
      set({ singleRecipe: res.data.data });
    } catch (error) {
      console.error("Failed to fetch single recipe", error);
    }
  },

  fetchAllRecipes: async () => {
    if (get().allRecipes.length > 0) return;

    try {
      const res = await axios.get(`${url}`);
      if (!res.data.success) {
        set({ error: res.data.message });
      }

      set({ allRecipes: res.data.data });
    } catch (error) {
      console.error("Failed to fetch all recipes", error);
    }
  },

  fetchRandomRecipes: async () => {
    try {
      const res = await axios.get(`${url}?rand=true`);
      if (!res.data.success) {
        set({ error: res.data.message });
      }

      set({ randomRecipes: res.data.data });
    } catch (error) {
      console.error("Failed to fetch random recipes", error);
    }
  },

  fetchRecipe: async (query) => {
    try {
      const res = await axios.get(`${url}?search=${query}`);
      if (!res.data.success) {
        set({ error: res.data.message });
      }

      set({ searchedRecipes: res.data.data });
    } catch (error) {
      console.error("Failed to fetch searched recipes", error);
    }
  },

  fetchIngreRecipe: async (ingredients) => {
    try {
      const res = await axios.get(`${url}?ingredients=${ingredients}`);
      if (!res.data.success) {
        set({ error: res.data.message });
      }

      set({ ingredientRecipes: res.data.data });
    } catch (error) {
      console.error("Failed to fetch recipes by ingredients", error);
    }
  },
}));
