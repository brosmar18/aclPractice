'use strict';

const express = require('express');
const { userModel } = require('../models');
const basicAuth = require('../middleware/basic');

const router = express.Router();

router.post('/signup', async (req, res, next) => {
    try {
        let newUser = await userModel.create(req.body);
        res.status(201).send({
            message: "Signup Successful",
            user: newUser
        });
        console.log('Signup Data: ', req.body)
    } catch (e) {
        console.error(e);
        next('Signup error occurred');
    }
});

router.post('/signin', basicAuth, (req, res, next) => {
    res.status(200).send({
        message: "Login Successful!",
        user: req.user,
    });
});

module.exports = router;