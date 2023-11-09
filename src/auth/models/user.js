'use strict';

const bcrypt = require('bcrypt');


module.exports = ( Sequelize, DataTypes ) => {
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
    },
    {
        hooks: {
            beforeCreate: async (user) => {
                let hashedPassword = await bcrypt.hash(user.password, 5);
                console.log('Hashed password in beforeCreate: ', hashedPassword);
                user.password = hashedPassword;
                console.log("Creating user: ", JSON.stringify(user, null, 2));
            }
        }
    });
    return User;
};

