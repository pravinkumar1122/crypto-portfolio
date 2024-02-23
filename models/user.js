const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: { 
        type: String, 
        required: true 
    },
    age: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cryptoAssets: [{  // Reference to the CryptoAsset model
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CryptoAsset'
    }]
});

module.exports = mongoose.model('User', userSchema);
