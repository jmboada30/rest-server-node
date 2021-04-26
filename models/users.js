const { Schema, model } = require('mongoose');

const UserSchema = Schema({
  nombre: {
    type: String,
    require: [true, 'Nombre obligatorio'],
  },
  email: {
    type: String,
    require: [true, 'Email obligatorio'],
    unique: true,
  },
  pass: {
    type: String,
    require: [true, 'Pass obligatorio'],
  },
  img: {
    type: String,
  },
  rol: {
    type: String,
    require: true,
    enum: ['ADMIN', 'USER'],
  },
  state: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

UserSchema.methods.toJSON = function () {
  const { __v, pass, ...user } = this.toObject();
  return user;
};

module.exports = model('User', UserSchema);
