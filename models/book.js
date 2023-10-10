import  mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  isbn: String,
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
});

const Book = mongoose.model('Book', bookSchema);

export default Book;
