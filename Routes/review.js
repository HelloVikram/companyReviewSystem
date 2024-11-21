const express = require('express');
const router = express.Router();

const controller=require('../Controllers/reviews');

router.post('/user/add-review',controller.postData);

router.get('/user/search/:name',controller.getData);

module.exports = router;