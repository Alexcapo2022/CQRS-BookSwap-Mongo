const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: false
  },
  userID: {
    type: String,
    required: false
  },
  // Otros campos específicos de comentario
},{versionKey: false});

module.exports = mongoose.model('Comment', commentSchema);