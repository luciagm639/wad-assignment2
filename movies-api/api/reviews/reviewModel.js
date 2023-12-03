import mongoose from 'mongoose';

const Schema = mongoose.Schema;


const ReviewSchema = new Schema({
  movie: { type: Number, required: true },
  author: { type: String },
  content: { type: String },
  created_at: { type: String },
  id: { type: String, required: true, unique: true }
});

ReviewSchema.statics.findByMovieDBId = function (id) {
  return this.find({ movie: id });
};

ReviewSchema.statics.findByReviewDBId = function (id) {
  return this.findOne({ id: id });
};

export default mongoose.model('Reviews', ReviewSchema);


