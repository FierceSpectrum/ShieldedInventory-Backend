// src/controllers/role.controller.js
const { Role, Permission, User } = require('../models');

module.exports = {
  async create(req, res) {
    try {
      const role = await Role.create(req.body);
      res.status(201).json(role);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async findAll(req, res) {
    try {
      const roles = await Role.findAll({ include: [Permission] });
      res.json(roles);
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