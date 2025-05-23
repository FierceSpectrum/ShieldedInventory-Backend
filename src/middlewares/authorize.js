const { Role, Permission } = require("@models");

const authorizeUser = (requiredPermission = []) => {
  return async (req, res, next) => {
    try {
      const user = req.user;

      if (!user || !user.roleId) {
        return res
          .status(403)
          .json({ message: "Acceso denegado: sin rol asignado" });
      }

      const role = await Role.findByPk(user.roleId, {
        include: {
          model: Permission,
          through: { attributes: [] },
        },
      });

      if (!role) {
        return res.status(403).json({ message: "Rol no válido" });
      }

      const hasPermission = role.Permissions.some(
        (p) => p.name === requiredPermission
      );

      if (!hasPermission) {
        return res
          .status(403)
          .json({ message: "No tenés permiso para realizar esta acción" });
      }

      next();
    } catch (err) {
      next(err);
    }
  };
};

const authorizeApp = (requiredPermission = []) => {
  return (req, res, next) => {
    try {
      const appPermissions = req.permissions;

      if (!appPermissions || !Array.isArray(appPermissions)) {
        return res
          .status(403)
          .json({ message: "Acceso denegado: permisos no válidos" });
      }

      const hasPermission = appPermissions.includes(requiredPermission);

      if (!hasPermission) {
        return res
          .status(403)
          .json({ message: "No tenés permiso para realizar esta acción" });
      }

      next();
    } catch (err) {
      next(err);
    }
  };
};

module.exports = { authorizeUser, authorizeApp };
