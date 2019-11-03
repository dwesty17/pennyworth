const { Sequelize } = require("sequelize");
const jwt = require('jsonwebtoken');

const JWT_KEY = process.env.JWT_KEY || "secret";

class User extends Sequelize.Model {
    generateAuthToken () {
        return jwt.sign({ id: this.id, isAdmin: this.isAdmin }, JWT_KEY);
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
        // TODO should we validate that value looks like an expected hash?
        validate: {
            min: 30, // TODO figure out hash length
            max: 30, // TODO figure out hash length
            // TODO isAlphanumeric?
        },
    },
    isAdmin: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: false,
    },
};

const userOptions = {
    modelName: 'user',
};

module.exports = {
    User,
    userAttributes,
    userOptions,
};