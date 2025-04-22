const { User } = require("@models");
const bcrypt = require("bcryptjs");
const AuthService = require("@services/auth.service");

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Verify user credentials
    const user = await AuthService.authenticateUser(username, password);
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = AuthService.generateToken(user);
    // Update last login time
    await AuthService.updateLastLogin(user.id);
    return res.status(200).json({ token, user });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const register = async (req, res) => {
  try {
    const { username, name, identification, password } = req.body;

    // Check if user already exists
    const users = await User.findAll();
    const usernameExists = users.some((user) =>
      bcrypt.compareSync(username, user.username)
    );

    if (usernameExists) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Create new user
    const newUser = await User.create({
      username,
      name,
      identification,
      password,
    });

    return res
      .status(201)
      .json({ message: "User registered successfully", user: newUser.id });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { login, register };
