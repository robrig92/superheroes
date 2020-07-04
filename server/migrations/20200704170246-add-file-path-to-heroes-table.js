'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.addColumn('Heroes', 'filePath', {
     type: Sequelize.DataTypes.STRING
   });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Heroes', 'filePath');
  }
};
