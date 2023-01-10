const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('user', {
    id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    email:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password:{
      type: DataTypes.STRING,
      allowNull: false
    },
    name:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName:{
      type: DataTypes.STRING,
      allowNull: false
    }
  });
};
