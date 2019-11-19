const { Sequelize } = require("sequelize");
const jwt = require('jsonwebtoken');

const JWT_KEY = process.env.JWT_KEY || "secret";

class User extends Sequelize.Model {
    generateAuthToken () {
        return jwt.sign({
            id: this.id,
            email: this.email,
            isAdmin: this.isAdmin,
        }, JWT_KEY);
    }
}

const userAttributes = {
    id : {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: { min: 60, max: 60 },
    },
    isSuspended: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    isAdmin: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
};

const userOptions = {
    modelName: 'user',
    underscored: true,
};

module.exports = {
    User,
    userAttributes,
    userOptions,
};