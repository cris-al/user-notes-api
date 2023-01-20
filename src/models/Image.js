const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("image", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        url: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        publicId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        show: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    });
};
