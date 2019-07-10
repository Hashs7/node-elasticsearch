const express = require('express');
const router  = express.Router();
const search  = require('../elastic/search');

router.get('/products/search', async (req, res, next) => {
    const {total, hits} = await search(req.query);

    res.status(200).json({
        total: total.value,
        count: hits.length,
        products: hits
    })
});

module.exports = router;
