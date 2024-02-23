const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
const allRoutes = require('./routes/authRoutes');
const portfolioRoutes = require('./routes/portfolioRoutes');
const connectToDB = require('./utils/mongo');
const app = express();
const PORT = process.env.PORT || 4000;

// Connect to MongoDB
connectToDB();

// Middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/', allRoutes);
app.use('/portfolio',portfolioRoutes)
// Define a route to render the home page
app.get('/home',allRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
