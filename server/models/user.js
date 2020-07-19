'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    username: {
      type: DataTypes.STRING,
      unique: true
    },
    password: {
      type: DataTypes.STRING
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {});
  User.associate = function(models) {
    User.hasMany(models.HeroeScore, {
      as: 'scores',
      foreignKey: 'user_id',
      onDelete: 'CASCADE'
    })
  };
  return User;
};
