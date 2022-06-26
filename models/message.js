const mongoose = require('mongoose');

const msgschema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    trim: true,
  },
  userName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,

    trim: true,
  },

  title: {
    type: String,
    required: true,
    trim: true,
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
  sendTime: {
    type: Date,
    default: Date.now,
  },

  isStatus: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const msgTable = new mongoose.model('msg', msgschema);
module.exports = msgTable;
