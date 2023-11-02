const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: Joi.string().max(20).min(5).required(),
      unique: true,
    },

    name: {
      type: Joi.string().max(50).min(5).required(),
      required: true,
    },

    password: {
      type: Joi.string().max(25).min(8).required(),
      required: true,
    },

    email: {
      type: Joi.string().max(50).min(8).required(),
      unique: true,
      required: true,
    },

    phonenumber: {
      type: Joi.number().max(11).min(11).required(),
    },

    address: {
      type: Joi.string(),
    },

    birthday: {
      type: Joi.string(),
    },

    sex: {
      type: Joi.string(),
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },

    isEmployee: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
