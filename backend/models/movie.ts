import mongoose from 'mongoose';

const MovieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
  },
  producer: {
    type: String,
  },
  publisher: {
    type: String,
  },
  cast: {
    type: Array,
  },
  rating: {
    type: Number,
  },
  trailer: {
    type: String,
  },
});
const movie = mongoose.model('Movie', MovieSchema);
export default movie;
