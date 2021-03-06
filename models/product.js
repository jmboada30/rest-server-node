const { Schema, model } = require('mongoose');

const ProductSchema = Schema({
  name: {
    type: String,
    required: [true, 'Nombre obligatorio'],
    unique: true,
  },

  state: {
    type: Boolean,
    default: true,
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  price: {
    type: Number,
    default: 0,
  },

  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },

  desc: {
    type: String,
  },

  stock: {
    type: Number,
    default: 0,
  },
});

ProductSchema.methods.toJSON = function () {
  const { __v, state, ...data } = this.toObject();
  return data;
};

module.exports = model('Product', ProductSchema);
