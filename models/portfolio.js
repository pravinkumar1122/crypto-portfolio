const mongoose = require('mongoose');

const cryptoAssetSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    cryptoType: {
        type: String,
        required: true
    },
    cryptoQuantity: {
        type: Number,
        required: true
    },
    cryptoPrice: {
        type: Number,
        required: true
    },
    cryptoCurrency: {
        type: String,
        default: 'USD'
    },
    cryptoDateAcquired: {
        type: Date,
        required: true
    },
    user: {  // Reference to the User model
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const CryptoAsset = mongoose.model('CryptoAsset', cryptoAssetSchema);

module.exports = CryptoAsset;
