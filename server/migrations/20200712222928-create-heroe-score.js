'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('HeroeScores', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      score: {
        type: Sequelize.FLOAT
      },
      comment: {
        type: Sequelize.STRING
      },
      heroe_id: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'Heroes'
          },
          key: 'id'
        }
      },
      user_id: {
        type: Sequelize.DataTypes.INTEGER,
        referemces: {
          model: {
            tableName: 'Users'
          },
          key: 'id'
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('HeroeScores');
  }
};
