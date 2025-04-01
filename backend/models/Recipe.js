const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "A recipe should have a title"],
      unique: true,
      trim: true,
      maxlength: 255,
    },
    ingredients: {
      type: [String], // Array of ingredient names
      required: [true, "A recipe should have atleast one ingredient"],
    },
    description: {
      type: String,
      required: [true, "A description is needed for a recipe"],
      trim: true,
    },
    steps: {
      type: [String], // Array of steps
      required: [true, "Please add steps to make the recipe"],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

recipeSchema.index({ title: "text", description: "text", ingredients: "text" });

recipeSchema.virtual("summary").get(function () {
  `${this.title} \n ${this.description ? this.description.substring(0, 50) + "..." : ""}`;
});

const RecipeModel = mongoose.model("Recipe", recipeSchema);
module.exports = RecipeModel;
