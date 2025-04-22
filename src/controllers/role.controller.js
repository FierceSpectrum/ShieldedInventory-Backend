// src/controllers/role.controller.js
const { Role, Permission } = require("@models");

module.exports = {
  async create(req, res) {
    try {
      const role = await Role.create(req.body);
      res.status(201).json(role.id);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async findAll(req, res) {
    try {
      const roles = await Role.findAll({ include: [Permission] });
      const filteredRoles = roles.map((role) => ({
        id: role.id,
        name: role.name,
        permissions: role.Permissions.map((permission) => ({
          id: permission.id,
          name: permission.name,
          description: permission.description,
        })),
      }));
      res.json(filteredRoles);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async findOne(req, res) {
    try {
      const role = await Role.findByPk(req.params.id, {
        include: [Permission],
      });
      if (!role) return res.status(404).json({ error: "Role not found" });
      const filteredRole = {
        id: role.id,
        name: role.name,
        permissions: role.Permissions.map((permission) => ({
          id: permission.id,
          name: permission.name,
          description: permission.description,
        })),
      };
      res.json(filteredRole);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async findByName(req, res) {
    try {
      const role = await Role.findOne({
        where: { name: req.params.name },
        include: [Permission],
      });
      if (!role) return res.status(404).json({ error: "Role not found" });
      const filteredRole = {
        id: role.id,
        name: role.name,
        permissions: role.Permissions.map((permission) => ({
          id: permission.id,
          name: permission.name,
          description: permission.description,
        })),
      };
      res.json(filteredRole);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const role = await Role.findByPk(req.params.id, { include: [Permission] });
      if (!role) return res.status(404).json({ error: "Role not found" });

      // Extract permissions from the request body
      let { permissions, ...roleData } = req.body;

      // Update role fields except id, createdAt, and updatedAt
      await role.update(roleData);

      // Handle permissions
      if (permissions) {
      // Ensure permissions is an array
      if (!Array.isArray(permissions)) {
        permissions = [permissions];
      }

      // Validate that all permissions exist
      const validPermissions = await Permission.findAll({
        where: { id: permissions },
      });

      if (validPermissions.length !== permissions.length) {
        return res.status(400).json({ error: "One or more permissions do not exist" });
      }

      // Assign permissions to the role
      await role.setPermissions(permissions);
      }

      // Fetch updated role with permissions
      const updatedRole = await Role.findByPk(req.params.id, { include: [Permission] });

      // Format the response
      const filteredRole = {
      id: updatedRole.id,
      name: updatedRole.name,
      permissions: updatedRole.Permissions.map((permission) => ({
        id: permission.id,
        name: permission.name,
        description: permission.description,
      })),
      };

      res.json(filteredRole);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async delete(req, res) {
    try {
      const role = await Role.findByPk(req.params.id);
      if (!role) return res.status(404).json({ error: "Role not found" });

      await role.destroy();
      res.json({ message: "Deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async assignPermissions(req, res) {
    try {
      const role = await Role.findByPk(req.params.id);
      if (!role) return res.status(404).json({ error: "Role not found" });

      const permissions = await Permission.findAll({
        where: { id: req.body.permissionIds },
      });
      if (permissions.length !== req.body.permissionIds.length) {
        return res.status(400).json({ error: "One or more permissions do not exist" });
      }
      await role.setPermissions(req.body.permissionIds);
      res.json({ message: "Permissions updated" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};
