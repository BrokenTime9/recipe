const express = require("express");
const http = require("http");
const cors = require("cors");
const { connectDB } = require("./config/db");
const recipeRoutes = require("./routes/recipeRoutes");

require("dotenv").config();

connectDB();

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:3000", "https://recipe-pi-amber.vercel.app"],
  }),
);

app.get("/home", (req, res) => {
  res.send("chat app");
});

app.use("/recipes", recipeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server is running on port : ${PORT}`);
});
