const express = require('express');
const router = express.Router();
const elastic     = require('../elastic');

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'cc'
    })
});

module.exports = router;
