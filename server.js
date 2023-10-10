import express from "express";
import colors from "colors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors"; // Add CORS middleware

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Configure CORS to allow requests from your frontend client
app.use(cors());

// Connect to MongoDB
import connectDB from "./db.js";
connectDB();

// Include routes for books, users, and reviews
import books from "./routes/books.js";
import users from "./routes/users.js";
import review from "./routes/review.js";

app.use("/books", books);
app.use("/users", users);
app.use("/reviews", review);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
