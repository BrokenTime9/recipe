const z = require("zod");

// Reusable username and password schema fields
const username = z
  .string({ required_error: "Username is required" })
  .min(3, "Username must be at least 3 characters long")
  .max(30, "Username must be at most 30 characters long");

const password = z
  .string({ required_error: "Password is required" })
  .min(6, "Password must be at least 6 characters long")
  .max(100, "Password must be at most 100 characters long");

const type = z.string({ require_error: "Type is required" }).optional();

const authSchema = z.object({
  username,
  password,
  type,
});

// Middleware for signup
const authCheckup = (req, res, next) => {
  const validation = authSchema.safeParse(req.body);

  if (!validation.success) {
    const errorMessages = validation.error.errors.map((err) => err.message);
    return res.status(400).json({ success: false, message: errorMessages });
  }

  req.body = validation.data;
  next();
};

module.exports = { authCheckup };
