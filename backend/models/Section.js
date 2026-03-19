import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    default: ""
  },
  content: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: ""
  },
  order: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

export default mongoose.model("Section", sectionSchema);
