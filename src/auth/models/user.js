'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();
const SECRET = process.env.SECRET;


module.exports = (Sequelize, DataTypes) => {
    const User = Sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        token: {
            type: DataTypes.VIRTUAL,
            get() {
                return jwt.sign({ username: this.username }, SECRET, { expiresIn: 1000 * 60 * 60 * 60 });
            },
            set() {
                return jwt.sign({ username: this.username }, SECRET, { expiresIn: 1000 * 60 * 60 * 60 });
            }
        }
    },
        {
            hooks: {
                beforeCreate: async (user) => {
                    let hashedPassword = await bcrypt.hash(user.password, 5);
                    console.log('Hashed password in beforeCreate: ', hashedPassword);
                    user.password = hashedPassword;
                    console.log("Creating user: ", JSON.stringify(user, null, 2));
                }
            },
        });

    User.authenticateBearer = async (token) => {
        try {
            let payload = jwt.verify(token, SECRET);
            console.log('payload', payload);

            const user = await User.findOne({ where: { username: payload.username } });

            return user || null;
        } catch (e) {
            console.error(e);
            throw e;
        };
    };

    return User;
};

