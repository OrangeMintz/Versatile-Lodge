const mongoose = require("mongoose");
const Joi = require("joi");

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    address: {
      type: String,
    },

    email: {
      type: String,
      unique: true,
      required: true,
    },

    photo: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Customer", customerSchema);
