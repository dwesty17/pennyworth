module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable("budget", {
        id : {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        description: {
          type: Sequelize.STRING,
        },
        amount: {
          type: Sequelize.FLOAT,
          allowNull: false,
        },
        timespan: {
          type: Sequelize.ENUM("WEEK", "MONTH", "YEAR"),
          allowNull: false,
        },
        created_at: {
          type: Sequelize.DATE,
        },
        updated_at: {
          type: Sequelize.DATE,
        },
      }, { transaction });

      await queryInterface.addColumn("transactions", "budget_id", {
        type: Sequelize.INTEGER,
        references: {
          model: "budget",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "set null",
      }, { transaction });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  down: async (queryInterface) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeColumn("transactions", "budget_id", { transaction });
      await queryInterface.dropTable("budget", { transaction });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
};
