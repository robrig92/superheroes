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
    // associations can be defined here
  };
  return HeroeScore;
};
