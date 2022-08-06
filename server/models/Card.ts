import mongoose from 'mongoose';
const { Schema } = mongoose;

const cardSchema = new Schema({
  text: String,
  type: String,
  NSFW: Boolean,
});

mongoose.model('cards', cardSchema);