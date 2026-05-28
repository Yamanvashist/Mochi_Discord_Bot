import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  xp: {
    type: Number,
    default: 0,
  },
  level: {
    type: Number,
    default: 0,
  },
  lastXp: {
    type: Date,
    default: Date.now(),
  },
  lastActive: {
    type: Date,
    default: Date.now(),
  },
  warned: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model("User", userSchema);
export default User;
