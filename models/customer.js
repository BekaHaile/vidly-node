const mongoose = require("mongoose");
const Joi = require("joi");

const Customer = mongoose.model("Customer", customerSchema);

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

function validateCustomer(customer) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(5).required(),
    phone: Joi.string().min(5).max(5).required(),
    isGold: Joi.boolean(),
  });

  return schema.validate(customer);
}

exports.Customer = Customer;
exports.validate = validateCustomer;