const cryptoAsset = require('../models/portfolio')

exports.addCryptoAsset = async (req, res) => {
    try {
        const { username, cryptoType, cryptoQuantity, cryptoPrice, cryptoCurrency, cryptoDateAcquired } = req.body;

        // Create a new instance of the CryptoAsset model with form data
        const cryptoasset = new cryptoAsset({
            username,
            cryptoType,
            cryptoQuantity,
            cryptoPrice,
            cryptoCurrency,
            cryptoDateAcquired
        });

        // Save the crypto asset to the database
        await cryptoasset.save();

        // Respond with success message
        res.send('Crypto asset added successfully');
    } catch (error) {
        // Handle any errors
        console.error('Error adding crypto asset:', error);
        res.status(500).send('Error adding crypto asset');
    }
};
