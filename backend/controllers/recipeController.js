const RecipeModel = require("../models/Recipe");
// response automation
const sendResponse = (res, statusCode, success, message, data = null) => {
  const response = { success, message };
  //added here --> incase of 0 or other unwanted valid values
  if (data !== null && data !== undefined) response.data = data;
  return res.status(statusCode).json(response);
};

// error handling automation
const handleError = (res, error, message = "An error occurred") => {
  console.error(`Error in recipe controller: ${error.message}`, {
    stack: error.stack,
    timestamp: new Date().toISOString(),
  });
  return sendResponse(res, 500, false, message);
};

//Recipe middleware

const validateRecipeInput = (req, res, next) => {
  try {
    let { title, ingredients, description, steps } = req.body;

    //check title
    if (!title?.trim()) {
      return sendResponse(res, 400, false, "Title is required");
    }

    //check description and if title && description are string
    if (
      typeof title !== "string" ||
      (description && typeof description !== "string")
    ) {
      return sendResponse(res, 400, false, "Invalid input types");
    }

    // check if ingredients is an array and not empty
    if (!Array.isArray(ingredients) || ingredients.length === 0) {
      return sendResponse(
        res,
        400,
        false,
        "Ingredients must be a non-empty array",
      );
    }

    // check if steps is an array and not empty
    if (!Array.isArray(steps) || steps.length === 0) {
      return sendResponse(res, 400, false, "Steps must be a non-empty array");
    }

    req.body.title = title.trim();
    req.body.description = description?.trim() || "";

    next();
  } catch (error) {
    return handleError(res, error, "Invalid request data");
  }
};

const getRecipeController = async (req, res) => {
  try {
    const { id, rand, ingredients, search } = req.query;

    if (id) {
      const recipe = await RecipeModel.findById(id);
      return sendResponse(res, 200, true, "Recipe retrieved", recipe);
    }

    if (rand) {
      // Get 5 random recipes
      const randomRecipes = await RecipeModel.aggregate([
        { $sample: { size: 5 } },
      ]);
      return sendResponse(
        res,
        200,
        true,
        "Random recipes retrieved",
        randomRecipes,
      );
    }

    if (ingredients) {
      // Find recipes containing at least one of the specified ingredients
      const ingredientArray = ingredients.split(",").map((ing) => ing.trim());
      const recipes = await RecipeModel.find({
        ingredients: { $in: ingredientArray },
      });

      if (recipes.length === 0) {
        return sendResponse(
          res,
          200,
          true,
          "No recipes found with the given ingredients",
          [],
        );
      }
      return sendResponse(
        res,
        200,
        true,
        "Recipes retrieved successfully",
        recipes,
      );
    }

    if (search) {
      // Perform a full-text search on title and description
      const recipes = await RecipeModel.find({
        $text: { $search: `"${search}"` },
      });

      if (recipes.length === 0) {
        return sendResponse(
          res,
          200,
          true,
          "No recipes found matching the search query",
          [],
        );
      }
      return sendResponse(
        res,
        200,
        true,
        "Recipes retrieved successfully",
        recipes,
      );
    }

    // Get all recipes if no query is provided
    const allRecipes = await RecipeModel.find();
    return sendResponse(res, 200, true, "All recipes retrieved", allRecipes);
  } catch (error) {
    return handleError(res, error, "Failed to fetch recipes");
  }
};

// add recipe contoller
const addRecipeController = async (req, res) => {
  try {
    //removed the extra step that creates an object manually
    const createdRecipe = await RecipeModel.create(req.body);

    return sendResponse(
      res,
      201,
      true,
      "Recipe created successfully",
      createdRecipe,
    );
  } catch (error) {
    if (error.name === "ValidationError") {
      return sendResponse(res, 400, false, "Validation failed", error.errors);
    }
    if (error.code === 11000) {
      return sendResponse(res, 409, false, "Duplicate recipe entry");
    }
    return handleError(res, error, "Failed to add recipe");
  }
};

module.exports = {
  validateRecipeInput,
  addRecipeController,
  getRecipeController,
};
