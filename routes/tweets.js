const express = require('express');
const router = express.Router();
const {Tweet} = require('../db/models')
const asyncHandler = require('../utils/utilities')


router.get('/', asyncHandler( async (req, res) => {
    const tweets = await Tweet.findAll()
    res.json({tweets})
    
    
}));

router.get('')

module.exports = router;
