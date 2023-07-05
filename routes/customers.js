const mongoose = require("mongoose");
const express = require("express");
const Joi = require("joi");
const router = express.Router();

const customerSchema = new mongoose.Schema({
  id: Number,
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  isGold: {
    type: Boolean,
    default: false,
  },
  phone: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
});

const Customer = mongoose.model("Customer", customerSchema);

router.get("/", async (req, res) => {
  const genres = await Customer.find().sort("name");
  res.send(genres);
});

router.post("/", async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let customer = new Customer({
    name: req.body.name,
    isGold: req.body.isGold,
    phone: req.body.phone,
  });

  customer = await customer.save();

  res.send(customer);
});

function validateCustomer(customer) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(5).required(),
    phone: Joi.string().min(5).max(5).required(),
    isGold: Joi.boolean(),
  });

  return schema.validate(customer);
}

module.exports = router;
