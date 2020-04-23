'use strict';
module.exports = (sequelize, DataTypes) => {
    const Heroe = sequelize.define('Heroe', {
        name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        age: DataTypes.INTEGER
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