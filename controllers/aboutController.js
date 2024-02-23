const User = require('../models/user');
exports.about=async (req, res) => {
    try {
        // Fetch all users from the database
        const users = await User.find();

        // Pass the users array to the render function
        res.render('about', { users: users });
    } catch (error) {
        console.error('Error fetching users', error);
        res.status(500).send('Internal Server Error');
    }};

