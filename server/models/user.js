'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: {
      DataTypes.STRING,
      unique: true
    },
    username: {
      DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING,
    active: {
      DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};