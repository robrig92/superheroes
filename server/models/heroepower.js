'use strict';
module.exports = (sequelize, DataTypes) => {
  const HeroePower = sequelize.define('HeroePower', {
    heroe_id: DataTypes.INTEGER,
    power_id: DataTypes.INTEGER
  }, {});
  HeroePower.associate = function(models) {
    // associations can be defined here
  };
  return HeroePower;
};