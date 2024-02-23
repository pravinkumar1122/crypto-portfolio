const express = require('express');
const router = express.Router();
const User = require('../models/user');
const authController=require('../controllers/authController')
const aboutController=require("../controllers/aboutController")

router.get('/register', authController.renderRigisterPage);

router.post('/register',authController.register);

router.post('/login', authController.login)

router.get('/index', (req, res) => {
    res.render('index');
});

router.get('/home',authController.home)

router.get('/login', authController.renderLoginPage)
router.get('/about', aboutController.about);
module.exports = router;
