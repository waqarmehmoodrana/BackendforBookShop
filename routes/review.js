import express from "express";
const router = express.Router();
import Review from "../models/review.js";
import jwt from "jsonwebtoken";

// Task 8: Add/Modify a book review (requires user authentication)
router.post("/", async (req, res) => {
  const { bookId, rating, comment } = req.body;
  const token = req.headers.authorization.split(" ")[1];
  try {
    const decoded = jwt.verify(token, "ASJHGJJKJHK1123JK");
    const userId = decoded.userId; // Use the user ID from the JWT token

    // Create a new review document with the correct user ID
    const newReview = new Review({ userId, bookId, rating, comment });

    // Save the new review to the database
    await newReview.save();

    res.json({ message: "Review added successfully" });
  } catch (err) {
    console.error("Error:", err); // Log the error
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Task 9: Delete book review added by that particular user (requires user authentication)
router.delete("/:reviewId", async (req, res) => {
  const { reviewId } = req.params;
  const token = req.headers.authorization.split(" ")[1];
  try {
    const decoded = jwt.verify(token, "ASJHGJJKJHK1123JK");
    const userId = decoded.userId;
    console.log(userId);

    const review = await Review.findById(reviewId);
    if (review && review.userId.toString() === userId) {
      await Review.findByIdAndDelete(reviewId);
      res.json({ message: "Review deleted successfully" });
    } else {
      res.status(401).json({ error: "Unauthorized" });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
