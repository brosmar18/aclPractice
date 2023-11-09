'use strict';

const express = require('express');
const { userModel } = require('../models');
const bearAuth = require('../middleware/bearer');

const router = express.Router();

router.get('/users', bearAuth, async (req, res, next) => {
    try {
        let users = await userModel.findAll();
        let payload = {
            results: users,
        };
        res.status(200).send(payload);
    } catch (e) {
        next();
    }
});

module.exports = router;