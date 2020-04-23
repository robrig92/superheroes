'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('HeroePowers', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            heroe_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: {
                        tableName: 'Heroes'
                    },
                    key: 'id'
                }
            },
            power_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: {
                        tableName: 'Powers'
                    },
                    key: 'id'
                }
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
        return queryInterface.dropTable('HeroePowers');
    }
};