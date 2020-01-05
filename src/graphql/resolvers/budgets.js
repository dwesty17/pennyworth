const { Budget } = require("../../database/models");

const getBudgets = (_, __, { user }) => {
    return Budget.findAll({ where: { userId: user.id } });
};

module.exports = {
    getBudgets,
};
