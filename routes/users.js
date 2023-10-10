import express from "express";
const router = express.Router();
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Task 6: Register New user
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    // Hash the user's password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.json({ message: "User registered successfully in BOOK DB " });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Task 7: Login as a Registered user
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (user && (await user.comparePassword(password))) {
      const token = jwt.sign(
        { userId: user._id, username },
        "ASJHGJJKJHK1123JK"
      );
      res.json({ token });
    } else {
      res.status(401).json({ error: "Authentication failed" });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Other user-related routes (e.g., profile, logout) can be added here
export default router;
