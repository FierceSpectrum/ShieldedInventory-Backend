const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
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
    const users = await User.findAll();
    let user = null;
    for (const u of users) {
        if (await bcrypt.compare(username, u.username)) {
            user = u;
            break;
        }
    }
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
        lastLogin: new Date(),
        role: user.role,
    };

    return filteredUser;
}

async function updateLastLogin(userId) {
    const user = await User.findByPk(userId);
    if (!user) {
        throw new Error('Usuario no encontrado');
    }

    user.lastLogin = new Date();
    await user.save();

    return user;
}

module.exports = {
    generateToken,
    authenticateUser,
    updateLastLogin
};