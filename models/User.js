import mongoose from "mongoose";
import bcrypt from "bcrypt";

import generateToken from "../helpers/generateToken.js";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  lastname: {
    type: String,
    required: true,
  },

  dni: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    default: null,
    trim: true,
  },

  district: {
    type: String,
    default: null,
  },

  token: {
    type: String,
    default: generateToken(),
  },

  confirmed: {
    type: Boolean,
    default: false,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.checkPassword = async function (passwordForm) {
  return await bcrypt.compare(passwordForm, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
