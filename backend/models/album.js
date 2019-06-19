const mongoose = require('mongoose');
const Schema = mongoose.Schema;

albumSchema = mongoose.Schema({
    name: { type: String, unique: true, required: true },
    description: { type: String },
    posts: [{
        type: Schema.Types.ObjectId, ref: 'Post'
    }]
});

module.exports = mongoose.model('Album', albumSchema);