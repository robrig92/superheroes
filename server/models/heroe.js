'use strict';
module.exports = (sequelize, DataTypes) => {
    const Heroe = sequelize.define('Heroe', {
        name: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        age: DataTypes.INTEGER,
        filePath: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {});
    Heroe.associate = function(models) {
        Heroe.belongsToMany(models.Power, {
            through: 'HeroePowers',
            as: 'powers',
            foreignKey: 'heroe_id',
            otherKey: 'power_id'
        });
    };
    return Heroe;
};