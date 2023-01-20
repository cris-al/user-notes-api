const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('jbcuser', {
      id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      username:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password:{
        type: DataTypes.STRING,
        allowNull: false
      },
  });
};