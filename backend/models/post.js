const mongoose = require('mongoose');
const Schema = mongoose.Schema;

postSchema = mongoose.Schema({
   title: { type: String, required: true },
   image: { type: String, required: true },
   album: {
      type: Schema.Types.ObjectId, ref: 'Album'
   }
});

module.exports = mongoose.model('Post', postSchema);