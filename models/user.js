import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  salt: String,
});
const model = mongoose.model("User", userSchema);
export default model;
