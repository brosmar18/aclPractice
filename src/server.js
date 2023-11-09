'use strict';

const express = require('express');
const authRouter = require('./auth/routes/auth');
const usersRouter = require('./auth/routes/users');
const acl = require('./auth/middleware/acl');

const bearAuth = require('./auth/middleware/bearer');

require('dotenv').config();
const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(authRouter);
app.use(usersRouter);

app.get('/read', bearAuth, acl('read'), (req, res, next) => {
    res.status(200).send('You have read permission');
});

app.get('/', (req, res, next) => {
    res.status(200).send("Hello World!");
});

const start = () => {
    app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
};

module.exports = {
    start,
    app
}