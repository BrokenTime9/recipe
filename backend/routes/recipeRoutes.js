const express = require("express");
const router = express.Router();

const {
  addRecipeController,
  validateRecipeInput,
} = require("../controllers/recipeController");

router.post("/recipes", validateRecipeInput, addRecipeController);

module.exports = router;
