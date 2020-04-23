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
        Power.belongsToMany(models.Heroe, {
            through: 'HeroePowers',
            as: 'heroes',
            foreignKey: 'power_id',
            otherKey: 'heroe_id'
        });
    };
    return Power;
};