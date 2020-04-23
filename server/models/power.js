'use strict';
module.exports = (sequelize, DataTypes) => {
    const Power = sequelize.define('Power', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args: DataTypes.STRING,
                msg: 'Name already in use'
            }
        }
    }, {});
    Power.associate = function(models) {
        // associations can be defined here
    };
    return Power;
};