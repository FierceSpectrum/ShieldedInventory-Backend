const express = require("express");
const router = express.Router();
const userController = require("@controllers/user.controller.js");
const { validateUser } = require("@validators/user.validator.js");
const jwtAuth = require("@middlewares/jwtAuth.js");
const { authorizeUser } = require("@middlewares/authorize.js");

router.use(jwtAuth);

// CRUD + extras
router.get("/", authorizeUser("user_read"), userController.findAll);
router.get("/:id", authorizeUser("user_read"), userController.findOne);
router.post("/", validateUser, authorizeUser("user_create"), userController.create);
router.put("/:id", validateUser, authorizeUser("user_update"), userController.update);
router.delete("/:id", authorizeUser("user_delete"), userController.delete);

// Extra lógica
router.patch(
  "/:id/password",
  authorizeUser("user_update"),
  validateUser,
  userController.changePassword
);
router.patch(
  "/:id/last-login",
  authorizeUser("user_update"),
  userController.updateLastLogin
);
router.patch(
  "/:id/assign-roles",
  authorizeUser("user_update"),
  userController.assignRoles
);

module.exports = router;
