const { User, Role, Product } = require("../models");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

module.exports = {
  async create(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    try {
      const { username, password, roleId } = req.body;
      const user = await User.create({ username, password, roleId });
      res.status(201).json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async findAll(req, res) {
    try {
      const users = await User.findAll({ include: [Role] });
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async findOne(req, res) {
    try {
      const user = await User.findByPk(req.params.id, { include: [Role] });
      if (!user) return res.status(404).json({ error: "User not found" });
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) return res.status(404).json({ error: "User not found" });

      await user.update(req.body);
      res.json(user);
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
      const user = await User.findByPk(req.user.id);

      const valid = await bcrypt.compare(oldPassword, user.password);
      if (!valid)
        return res.status(400).json({ error: "Old password incorrect" });

      user.password = newPassword;
      await user.save();
      res.json({ message: "Password updated" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async updateLastLogin(id) {
    await User.update({ lastLogin: new Date() }, { where: { id } });
  },
};
