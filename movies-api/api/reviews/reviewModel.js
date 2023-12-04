import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const Schema = mongoose.Schema;


const ReviewSchema = new Schema({
  movie: { type: Number, required: true },
  author: { type: String, required: true },
  content: { type: String },
  created_at: { type: String, required: true }
});

ReviewSchema.statics.findByMovieDBId = function (id) {
  return this.find({ movie: id });
};

ReviewSchema.statics.findByReviewDBId = function (id) {
  return this.findOne({ _id: id });
};

export default mongoose.model('Reviews', ReviewSchema);


