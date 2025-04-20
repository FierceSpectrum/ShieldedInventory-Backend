// src/models/Role.js

module.exports = (sequelize, DataTypes) => {
  const Permission = sequelize.define("Permission", {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  Permission.associate = (models) => {
    Permission.belongsToMany(models.Role, {
      through: "RolePermissions",
      foreignKey: "permissionId",
    });
  };

  return Permission;
};
