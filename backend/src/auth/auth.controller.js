const bcrypt = require("bcryptjs");
const { User } = require("./auth.schema.js");
const { sendSuccess, sendError } = require("../utils/global.response.js");
const { createData, findOneData } = require("../utils/global.model.js");

const SALT_ROUNDS = 10;

// Register controller
const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user already exists
    const existingUser = await findOneData(User, { username });
    if (existingUser) {
      return sendError(res, new Error("Username already taken"), 409);
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Create user
    const newUser = await createData(User, {
      username,
      password: hashedPassword,
    });

    // Respond
    return sendSuccess(
      res,
      { id: newUser._id, username: newUser.username },
      "User registered successfully",
      201,
    );
  } catch (error) {
    return sendError(res, error);
  }
};

// Login controller
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user by username
    const user = await findOneData(User, { username });
    if (!user) {
      return sendError(res, new Error("Invalid username or password"), 401);
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return sendError(res, new Error("Invalid username or password"), 401);
    }

    // Respond
    return sendSuccess(
      res,
      { id: user._id, username: user.username, type: user.type },
      "Login successful",
    );
  } catch (error) {
    return sendError(res, error);
  }
};

module.exports = { register, login };
