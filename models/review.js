import  mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
  rating: Number,
  comment: String,
});

const Review = mongoose.model('Review', reviewSchema);

export default Review;
