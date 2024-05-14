import mongoose from "mongoose";
const { Schema } = mongoose;

const userModel = new Schema({
  username: { type: String },
  password: { type: String },
  email: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("user", userModel);
