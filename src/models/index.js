// src/models/index.js
const Sequelize = require('sequelize');
const sequelize = require('@config/database');
const User = require('@models/User');
const Product = require('@models/Product');
const Role = require('@models/Role');
const Permission = require('@models/Permission');

const db = {
    User: User(sequelize, require('sequelize').DataTypes),
    Product: Product(sequelize, require('sequelize').DataTypes),
    Role: Role(sequelize, require('sequelize').DataTypes),
    Permission: Permission(sequelize, require('sequelize').DataTypes),
};

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;