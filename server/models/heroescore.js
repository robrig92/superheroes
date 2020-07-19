'use strict';
module.exports = (sequelize, DataTypes) => {
  const HeroeScore = sequelize.define('HeroeScore', {
    score: {
      type: DataTypes.FLOAT,
      required: true,
      defaultValue: 5.0,
    },
    comment: {
      type: DataTypes.STRING
    }
  }, {});
  HeroeScore.associate = function(models) {
    HeroeScore.belongsTo(models.Heroe, {
      as: 'heroe',
      foreignKey: 'heroe_id'
    });
    HeroeScore.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'user_id'
    });
  };
  return HeroeScore;
};
