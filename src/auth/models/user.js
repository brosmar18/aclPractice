'use strict';

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
            beforeCreate: (user) => {
                console.log("Creating user: ", JSON.stringify(user, null, 2));
            }
        }
    });
    return User;
};

