const jwt = require("jsonwebtoken");

const { JWT_KEY } = require("../config");
const { User } = require("../database/models");

const context = async ({ req }) => {
    try {
        const token = req.headers.authorization;

        if (token) {
            const user = await tradeTokenForUser(token);
            return {
                user: { ...user, token },
            };
        } else {
            return {};
        }
    } catch (error) {
        return {};
    }
};

const tradeTokenForUser = async (token) => {
    try {
        const decodedToken = jwt.verify(token, JWT_KEY);

        if (decodedToken) {
            const matchingUserRecord = await User.findOne({ where: { id: decodedToken.id } });
            return matchingUserRecord.dataValues;
        }
    } catch (error) {
        console.warn("Unable to decode token");
    }
};

module.exports = context;
