"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRecipeStore } from "../store/store";
import { useRouter } from "next/navigation";

export default function RecipesPage() {
  const {
    allRecipes,
    randomRecipes,
    searchedRecipes,
    ingredientRecipes,
    fetchAllRecipes,
    fetchRandomRecipes,
    fetchRecipe,
    fetchIngreRecipe,
    error,
    user,
    logoutUser,
  } = useRecipeStore();
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [displayCategory, setDisplayCategory] = useState("all"); // Track which category to show

  useEffect(() => {
    if (user.length <= 0) {
      router.push("/auth");
    }
    fetchAllRecipes();
  }, []);

  const handleRandomRecipes = () => {
    setDisplayCategory("random");
    fetchRandomRecipes();
  };

  const handleSearch = () => {
    setDisplayCategory("search");
    fetchRecipe(search);
  };

  const handleIngredientSearch = () => {
    setDisplayCategory("ingredients");
    fetchIngreRecipe(ingredients);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-3xl font-semibold text-gray-700 py-2">
            👋 Welcome,{" "}
            <span className="font-bold text-red-600">
              {user?.username || "User"}
            </span>
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/add"
            className="text-blue-500 hover:text-blue-700 text-lg font-semibold"
          >
            Add a recipe +
          </Link>

          <button
            onClick={() => {
              logoutUser();
              router.push("/auth");
            }}
            className="text-red-500 hover:text-red-700 flex items-center gap-1 text-sm"
          >
            <span className="material-icons">logout</span>
            Logout
          </button>
        </div>
      </div>
      {/* Search by Recipe Name */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search recipe..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      {/* Search by Ingredients */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter ingredients (comma separated)..."
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <button
          onClick={handleIngredientSearch}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Find by Ingredients
        </button>
      </div>

      {/* Fetch Random Recipes */}
      <button
        onClick={handleRandomRecipes}
        className="bg-purple-500 text-white px-4 py-2 rounded mb-4"
      >
        Get Random Recipes
      </button>

      {/* Display Recipes */}

      {/* Display Recipes */}
      <div>
        {displayCategory === "search" && (
          <>
            {searchedRecipes.length > 0 ? (
              <>
                <h2 className="text-xl font-semibold mt-4">
                  🔍 Search Results
                </h2>
                <RecipeList recipes={searchedRecipes} />
              </>
            ) : (
              <p className="text-lg text-gray-600 text-center">{error}</p>
            )}
          </>
        )}

        {displayCategory === "ingredients" && ingredientRecipes.length > 0 ? (
          <>
            <h2 className="text-xl font-semibold mt-4">
              🥗 Recipes by Ingredients
            </h2>
            <RecipeList recipes={ingredientRecipes} />
          </>
        ) : displayCategory === "ingredients" ? (
          <p className="text-lg text-gray-600 text-center">{error}</p>
        ) : null}

        {displayCategory === "random" && randomRecipes.length > 0 ? (
          <>
            <h2 className="text-xl font-semibold mt-4">🎲 Random Recipes</h2>
            <RecipeList recipes={randomRecipes} />
          </>
        ) : displayCategory === "random" ? (
          <p className="text-lg text-gray-600 text-center">{error}</p>
        ) : null}

        {displayCategory === "all" && allRecipes.length > 0 ? (
          <>
            <h2 className="text-xl font-semibold mt-4">📖 All Recipes</h2>
            <RecipeList recipes={allRecipes} />
          </>
        ) : displayCategory === "all" ? (
          <p className="text-lg text-gray-600 text-center">{error}</p>
        ) : null}
      </div>
    </div>
  );
}

function RecipeList({ recipes }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {recipes.map((recipe) => (
        <Link href={`/recipes/${recipe._id}`} key={recipe._id}>
          <div className="border p-4 rounded shadow cursor-pointer hover:bg-gray-100">
            <h3 className="text-lg font-bold">{recipe.title}</h3>
            <p className="text-sm text-gray-600">{recipe.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
