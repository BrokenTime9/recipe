const express = require("express");
const http = require("http");
const cors = require("cors");
const { connectDB } = require("./config/db");
const recipeRoutes = require("./src/recipe/routes/recipeRoutes");
const authRoutes = require("./src/auth/auth.routes.js");
const errorHandler = require("./src/middlewares/errorHanlder");

require("dotenv").config();

connectDB();

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "https://recipe-pi-amber.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);
app.use(errorHandler);

app.use(express.json());

app.get("/home", (req, res) => {
  res.send("chat app");
});

app.use("/recipes", recipeRoutes);
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server is running on port : ${PORT}`);
});
