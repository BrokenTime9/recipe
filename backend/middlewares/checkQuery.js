const checkRecipeInput = (req, res, next) => {
  try {
    const { title, ingredients, description, steps } = req.body;
    next();
  } catch (error) {}
};

module.exports = { checkRecipeInput };
