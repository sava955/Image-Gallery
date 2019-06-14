const mongoose = require('mongoose');

postSchema = mongoose.Schema({
   title: { type: String, required: true },
   image: { type: String, required: true }
});

module.exports = mongoose.model('Post', postSchema);