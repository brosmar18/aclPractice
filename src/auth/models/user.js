'use strict';

module.exports = { sequelize, DataTypes } => {
    const User = sequelize.define('User', {
        username: {
            type: this.DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: this.DataTypes.STRING,
            allowNull: false
        },
    },
    {
        hooks: {
            beforeCreate: (user) => {
                console.log("Creating user: ", JSON.stringify(user, null, 2));
            }
        }
    });
    return User;
};

