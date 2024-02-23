const User = require('../models/user');
const axios=require('axios');
const bcrypt = require('bcrypt');
const cryptoAsset = require('../models/portfolio');

exports.renderRigisterPage=(req, res) => {
    res.render('register', { msg: null, msg_type: null });
};
exports.renderLoginPage = (req, res) => {
    res.render('login', { msg: null, msg_type: null });
};


exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.render('login', {
                msg: "User not found",
                msg_type: "error"
            });
        }

        // Compare provided password with hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.render('login', {
                msg: "Wrong password",
                msg_type: "error"
            });
        }

        // Password is correct, render the index page or redirect to dashboard
        username=user.name
        asset=cryptoAsset.cryptoCurrency;
        res.render('index',{username},(asset));
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

//register
exports.register = async (req, res) => {
    const { name, email, age, password, confirm_password } = req.body;
    if (password !== confirm_password) {
        return res.status(400).render('register', {
            msg: "Password doesn't not Match",
            msg_type: "error",
        });
    }
    
    if (password.length < 8) {
        return res.render('register', {
            msg: "Password is weak",
            msg_type: "error",
        }); 
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send('User already exists');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user instance with the hashed password
        const newUser = new User({ name, email, age, password: hashedPassword });

        // Save the user to the database
        await newUser.save();
        username=User.name;
        res.render('index',{username},);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};


exports.home = async (req, res) => {
    try {
        // Fetch cryptocurrency tickers from Coinlore API
        const response = await axios.get('https://api.coinlore.net/api/tickers/');
        
        // Extract data for the specified cryptocurrencies
        const cryptoData = response.data.data.slice(0, 10).map(crypto => ({
            currency: crypto.name,
            price: parseFloat(crypto.price_usd).toFixed(2),
        }));

        // Render the home page and pass the cryptocurrency data to it
        res.render('home', { cryptoData });
    } catch (error) {
        console.error('Error fetching cryptocurrency data:', error);
        res.status(500).send('Error fetching cryptocurrency data');
    }
};
