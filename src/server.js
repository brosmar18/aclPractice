'use strict';

const express = require('express');
const authRouter = require('./auth/routes/auth');
const usersRouter = require('./auth/routes/users');

require('dotenv').config();
const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(authRouter);
app.use(usersRouter);

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