const {DataTypes} = require('sequelize');

module.exports = (sequelize)=>{
    sequelize.define('note', {
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        contents:{
            type: DataTypes.TEXT,
            allowNull: false,
        }
    })
}