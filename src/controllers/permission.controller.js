// src/controllers/permission.controller.js
const { Permission, Role } = require("../models");

module.exports = {
  async create(req, res) {
    try {
      const permission = await Permission.create(req.body);
      res.status(201).json(permission);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async rolesWithPermission(req, res) {
    try {
      const permission = await Permission.findByPk(req.params.id, {
        include: [Role],
      });
      if (!permission)
        return res.status(404).json({ error: "Permission not found" });
      res.json(permission.Roles);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};
