const express = require('express');
const router = express.Router();
const {Tweet} = require('../db/models')
const asyncHandler = require('../utils/utilities')

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

module.exports = router;
