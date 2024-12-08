const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Defining the schema for the customization data
const customizationSchema = new Schema({
  color: {
    type: String,
    required: true
  },
  texture: {
    type: String,
    required: true
  }


});

// Defining the main schema for the order
const Order = new Schema({
  // size: {
  //   type: Number,
  //   required: true
  // },
  customizations: {
    laces: customizationSchema,
    sole_top: customizationSchema,
    meshes5_1: customizationSchema,
    outside_1: customizationSchema,
    outside_2: customizationSchema,
    outside_3: customizationSchema,
    sole_bottom: customizationSchema
  },

  status: {
    type: String,
    required: true,
    default: 'pending'
  }
});

// Export the model
module.exports = mongoose.model('Order', Order);
