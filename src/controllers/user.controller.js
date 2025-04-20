const { User, Role, Product } = require("../models");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

module.exports = {
  async create(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    try {
      const { username, name, password, roleId } = req.body;
      const user = await User.create({ username, name, password, roleId });
      res.status(201).json(user.id);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async findAll(req, res) {
    try {
      const users = await User.findAll({ include: [Role] });
      const filteredUsers = users.map((user) => ({
        id: user.id,
        name: user.name,
        lastLogin: user.lastLogin,
        Role: user.Role ? user.Role.name : null,
      }));
      res.json(filteredUsers);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async findOne(req, res) {
    try {
      const user = await User.findByPk(req.params.id, { include: [Role] });
      if (!user) return res.status(404).json({ error: "User not found" });

      const filteredUser = {
        id: user.id,
        name: user.name,
        lastLogin: user.lastLogin,
        Role: user.Role ? user.Role.name : null,
      };
      res.json(filteredUser);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) return res.status(404).json({ error: "User not found" });

      const { password, ...updateData } = req.body;
      await user.update(updateData);
      const filteredUser = {
        id: user.id,
        name: user.name,
        lastLogin: user.lastLogin,
        Role: user.Role ? user.Role.name : null,
      };
      res.json(filteredUser);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async delete(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) return res.status(404).json({ error: "User not found" });

      await user.destroy();
      res.json({ message: "User deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async changePassword(req, res) {
    try {
      const { oldPassword, newPassword } = req.body;
      const user = await User.findByPk(req.params.id);
      if (!user) return res.status(404).json({ error: "User not found" });
      
      const valid = await bcrypt.compare(oldPassword, user.password);
      if (!valid)
        return res.status(400).json({ error: "Old password incorrect" });
      if (oldPassword === newPassword) {
        return res.status(400).json({ error: "New password cannot be the same as the old password" });
      }
      user.password = newPassword;
      await user.save();
      res.json({ message: "Password updated" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async updateLastLogin(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) return res.status(404).json({ error: "User not found" });

      const updatedAt = new Date();
      await user.update({ lastLogin: updatedAt });
      res.json({ message: "Last login updated", updatedAt });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};
