const express = require('express');
const router = express.Router();
const User = require('../models/portfolio');
const portfolioController=require('../controllers/portfolioController')

router.get('/',(req,res)=>{
    res.render('portfolio')
})

router.post('/addCryptoAsset',portfolioController.addCryptoAsset);



module.exports=router;