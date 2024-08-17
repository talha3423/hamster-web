const mongoose = require('mongoose');

const KeySchema = new mongoose.Schema({
    key: { type: String, required: true, unique: true },
    type:{type:Number, required:true},
});

module.exports = mongoose.model('Key', KeySchema);