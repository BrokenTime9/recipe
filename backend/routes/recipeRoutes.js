const express = require("express");
const router = express.Router();

const {
  addRecipeController,
  validateRecipeInput,
  getRecipeController,
} = require("../controllers/recipeController");

router.post("/add", validateRecipeInput, addRecipeController);
router.get("/get", getRecipeController);

module.exports = router;
