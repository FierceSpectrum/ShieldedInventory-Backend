const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('@models');

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';

// Servicio para generar un token
function generateToken(user) {
    const payload = {
        id: user.id,
        name: user.name,
        identification: user.identification,
        lastLogin: user.lastLogin,
        role: user.role,
    };

    return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' }); // Token válido por 1 hora
}

// Servicio para autenticar al usuario
async function authenticateUser(username, password) {
    const salt = await bcrypt.genSalt(10);
    const encryptedUsername = bcrypt.hash(username, salt);
    const user = await User.findOne({ where: { username: encryptedUsername } });

    if (!user) {
        throw new Error('Usuario no encontrado');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw new Error('Contraseña incorrecta');
    }

    const filteredUser = {
        id: user.id,
        name: user.name,
        identification: user.identification,
        lastLogin: user.lastLogin,
        role: user.role,
    };

    return filteredUser;
}

module.exports = {
    generateToken,
    authenticateUser,
};