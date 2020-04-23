'use strict';
module.exports = (sequelize, DataTypes) => {
    const Heroe = sequelize.define('Heroe', {
        name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        superpower: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        age: DataTypes.INTEGER
    }, {});
    Heroe.associate = function(models) {
        // associations can be defined here
    };
    return Heroe;
};