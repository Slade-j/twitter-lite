const express = require('express');
const router = express.Router();
const {Tweet} = require('../db/models')
const asyncHandler = require('../utils/utilities')
const {check, validationResult} = require('express-validator');

const tweetErrors = [
    check("message")
        .exists({checkFalsy: true})
        .withMessage("Please enter a tweet before submitting."),
    check("message")
        .isLength({max: 280})
        .withMessage("Tweets cannot exceed 280 characters.")
    ]

const handleValidationErrors = (req, res, next) =>{
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()){
    const errors = validationErrors.array().map((error) => error.msg);
    const err = new Error('Bad Request.');
    err.errors = errors;
    err.status = 400;
    err.title = "Bad Request."
    return next(err);
    }
    next();
}

const tweetNotFound = (id) => {
    const err = new Error(`The tweet with the givin id of ${id} not found.`);
    err.title = 'Tweet not Found';
    err.status = 404;
    return err;
}

router.get('/', asyncHandler( async (req, res) => {
    const tweets = await Tweet.findAll()
    res.json({tweets})


}));

router.get('/:id(\\d+)', asyncHandler(async (req, res, next) => {
    const tweetId = parseInt(req.params.id, 10);
    const tweet = await Tweet.findByPk(tweetId);

    if (tweet) res.json({ tweet });
    else next(tweetNotFound(tweetId));

}));

router.post('/', tweetErrors, handleValidationErrors, asyncHandler(async (req, res, next) =>{
    const { message } = req.body;
    const newTweet = await Tweet.create({ message });
    res.json({ newTweet });
}));

router.put('/:id(\\d+)',tweetErrors, handleValidationErrors, asyncHandler (async (req, res, next)=>{
    const tweetId = partInt(req.params.id, 10);
    if (!tweet)  next(tweetNotFound(tweetId))
    const currentTweet = await Tweet.findByPk(tweetId);
    currentTweet.message = req.body.message
    await currentTweet.save();
    res.json({currentTweet})
} )) 

// await currentTweet.update({message: req.body.message})


module.exports = router;
