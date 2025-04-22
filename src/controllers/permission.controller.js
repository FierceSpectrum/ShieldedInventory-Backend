// src/controllers/permission.controller.js
const { Permission, Role } = require("@models");

module.exports = {
  async create(req, res) {
    try {
      const permission = await Permission.create(req.body);
      res.status(201).json(permission.id);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async findAll(req, res) {
    try {
      const permissions = await Permission.findAll();
      const filteredPermissions = permissions.map((permission) => ({
        id: permission.id,
        name: permission.name,
        description: permission.description,
      }));
      res.json(filteredPermissions);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async findOne(req, res) {
    try {
      const permission = await Permission.findByPk(req.params.id);
      if (!permission)
        return res.status(404).json({ error: "Permission not found" });

      const filteredPermission = {
        id: permission.id,
        name: permission.name,
        description: permission.description,
      };
      res.status(201).json(filteredPermission);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const permission = await Permission.findByPk(req.params.id);
      if (!permission)
        return res.status(404).json({ error: "Permission not found" });
      await permission.update(req.body);
      const filteredPermission = {
        id: permission.id,
        name: permission.name,
        description: permission.description,
      };
      res.status(201).json(filteredPermission);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async delete(req, res) {
    try {
      const permission = await Permission.findByPk(req.params.id);
      if (!permission)
        return res.status(404).json({ error: "Permission not found" });
      await permission.destroy();
      res.json({ message: "Deleted" }).send();
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
