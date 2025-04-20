// Comando para crear y levantar el proyecto:
// npm init -y && npm i express cors helmet express-rate-limit bcryptjs jsonwebtoken express-validator pg pg-hstore sequelize dotenv cookie-parser express-session connect-pg-simple
// src/app.js

require('module-alias/register');
require("dotenv").config();
const express = require("express");
const app = express();

const db = require("./config/database.js");
const loadMiddlewares = require("@loaders/middlewareLoader.js");

// Rutas
const userRoutes = require("./routes/user.route.js");
const productRoutes = require("./routes/product.route.js");
const roleRoutes = require("./routes/role.route.js");
const permissionRoutes = require("./routes/permission.route.js");

// Carga todos los middlewares
loadMiddlewares(app);

// Rutas del sistema
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/permissions", permissionRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Base de datos y servidor
db.sync({ alert: true })
  .then(() => {
    console.log("Database synced successfully!");
    const PORT = process.env.PORT || 3002;
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error syncing database:", err);
  });
