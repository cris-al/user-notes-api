const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('publicinfo', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        welcomeText: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        descriptionHome: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        descriptionContact: {
            type: DataTypes.TEXT,
        },
        instagramUrl: {
            type: DataTypes.TEXT,
        },
        facebookUrl: {
            type: DataTypes.TEXT,
        },
    });
};