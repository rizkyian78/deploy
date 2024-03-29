'use strict';
const {
  Model,
  DataTypes
} = require('sequelize');



module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
models.User.hasMany(models.Product, {foreignKey: "userId"})
    }
  };
  User.init({
    username: DataTypes.STRING,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'User',
    paranoid: true
  });

  return User;
};