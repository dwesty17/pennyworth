module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.createTable("users", {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                email: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                password: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                is_suspended: {
                    type: Sequelize.BOOLEAN,
                    allowNull: false,
                    defaultValue: true,
                },
                is_admin: {
                    type: Sequelize.BOOLEAN,
                    allowNull: false,
                    defaultValue: false,
                },
                monthly_spending_goal: {
                    type: Sequelize.FLOAT,
                },
                created_at: {
                    type: Sequelize.DATE,
                },
                updated_at: {
                    type: Sequelize.DATE,
                },
            }),
            queryInterface.createTable("transactions", {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                type: {
                    type: Sequelize.ENUM("CREDIT", "DEBIT"),
                    allowNull: false,
                },
                transaction_time: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                category: {
                    type: Sequelize.ENUM("PAYCHECK", "RENT", "TRANSPORTATION"),
                    allowNull: false,
                },
                tags: {
                    type: Sequelize.ARRAY(Sequelize.STRING),
                    allowNull: false,
                    defaultValue: [],
                },
                transactee: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                transactee_type: {
                    type: Sequelize.ENUM("VENDOR", "PERSON", "EMPLOYER"),
                },
                description: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                amount: {
                    type: Sequelize.FLOAT,
                    allowNull: false,
                },
                created_at: {
                    type: Sequelize.DATE,
                },
                updated_at: {
                    type: Sequelize.DATE,
                },
            }),
        ]);
    },

    down: (queryInterface) => {
        return Promise.all([
            queryInterface.dropTable("users"),
            queryInterface.dropTable("transactions"),
        ]);
    },
};
