const { User, Role } = require("@models");
const bcrypt = require("bcryptjs");

module.exports = {
  async create(req, res) {
    try {
      const { username, name, identification, password, roleId } = req.body;

      // Fetch all users to compare encrypted usernames
      const users = await User.findAll();
      const usernameExists = users.some(user => bcrypt.compareSync(username, user.username));

      if (usernameExists) {
      return res.status(400).json({ error: "Username already exists" });
      }

      // Create the user
      const user = await User.create({ 
      username, 
      name, 
      identification, 
      password, 
      roleId 
      });

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
        identification: user.identification,
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
        identification: user.identification,
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
        identification: user.identification,
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
