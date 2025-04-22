const { User } = require("@models");
const jwt = require("jsonwebtoken");
const AuthService = require("@services/auth.service");

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Verify user credentials
        const user = await AuthService.authenticateUser(email, password);
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Generate JWT token
        const token = AuthService.generateToken(user);

        return res.status(200).json({ token, user });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { login };




