// src/controllers/role.controller.js
const { Role, Permission, User } = require('../models');

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
      const role = await Role.findByPk(req.params.id, { include: [Permission] });
      if (!role) return res.status(404).json({ error: 'Role not found' });
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
      const role = await Role.findByPk(req.params.id);
      if (!role) return res.status(404).json({ error: 'Role not found' });

      await role.update(req.body);
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

  async delete(req, res) {
    try {
      const role = await Role.findByPk(req.params.id);
      if (!role) return res.status(404).json({ error: 'Role not found' });

      await role.destroy();
      res.json({ message: 'Deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async assignPermissions(req, res) {
    try {
      const role = await Role.findByPk(req.params.id);
      if (!role) return res.status(404).json({ error: 'Role not found' });

      await role.setPermissions(req.body.permissionIds);
      res.json({ message: 'Permissions updated' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};