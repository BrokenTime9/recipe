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

  fetchSingleRecipe: async (id) => {
    try {
      const res = await axios.get(`${url}?id=${id}`);
      set({ singleRecipe: res.data.data });
    } catch (error) {
      console.error("Failed to fetch single recipe", error);
    }
  },

  fetchAllRecipes: async () => {
    if (get().allRecipes.length > 0) return;

    try {
      const res = await axios.get(`${url}/get`);
      set({ allRecipes: res.data.data });
    } catch (error) {
      console.error("Failed to fetch all recipes", error);
    }
  },

  fetchRandomRecipes: async () => {
    try {
      const res = await axios.get(`${url}?rand=true`);
      set({ randomRecipes: res.data.data });
    } catch (error) {
      console.error("Failed to fetch random recipes", error);
    }
  },

  fetchRecipe: async (query) => {
    try {
      const res = await axios.get(`${url}?search=${query}`);
      set({ searchedRecipes: res.data.data });
    } catch (error) {
      console.error("Failed to fetch searched recipes", error);
    }
  },

  fetchIngreRecipe: async (ingredients) => {
    try {
      const res = await axios.get(`${url}?ingredients=${ingredients}`);
      set({ ingredientRecipes: res.data.data });
    } catch (error) {
      console.error("Failed to fetch recipes by ingredients", error);
    }
  },
}));
