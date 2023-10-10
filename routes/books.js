import express from "express";
const router = express.Router();
import Book from "../models/book.js";
import Review from "../models/review.js";

// Task 1: Get the book list available in the shop
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Task 2: Get books based on ISBN
router.get("/isbn/:isbn", async (req, res) => {
  const { isbn } = req.params;
  try {
    const book = await Book.findOne({ isbn });
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Task 3: Get all books by Author
router.get("/author/:author", async (req, res) => {
  const { author } = req.params;
  try {
    const books = await Book.find({ author });
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Task 4: Get all books based on Title
router.get("/title/:title", async (req, res) => {
  const { title } = req.params;
  try {
    const books = await Book.find({ title });
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});



// Create review
router.post("/writeReview", async (req, res) => {
  try {
    // Extract review data from the request body
    const { userId, bookId, rating, comment } = req.body;

    // Create a new review document
    const newReview = new Review({
      userId,
      bookId,
      rating,
      comment,
    });

    // Save the review to the database
    await newReview.save();

    // Update the book's reviews array with the new review ObjectId
    await Book.findOneAndUpdate(
      { _id: bookId },
      { $push: { reviews: newReview._id } }
    );

    res.status(201).json(newReview); // Respond with the created review
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Task 5: Get book Review
router.get("/:bookId/reviews", async (req, res) => {
  const { bookId } = req.params;
  try {
    const reviews = await Review.find({ bookId });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
