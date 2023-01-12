const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('song', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        artist:  {
            type: DataTypes.STRING,
        },
        album: {
            type: DataTypes.STRING,
        },
        genre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        urlsong: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        publicidsong: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        urlimage: {
            type: DataTypes.TEXT,
        },
        publicidimage: {
            type: DataTypes.STRING,
        },
        show: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        }
    })
}