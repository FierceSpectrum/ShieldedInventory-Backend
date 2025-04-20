const helmet = require("helmet");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const sessionMiddleware = require("@config/session");
const limiter = require("@config/limiter");
const jwtAuth = require("@middlewares/jwtAuth");

module.exports = function loadMiddlewares(app) {
  app.use(helmet());
  app.use(cors({ origin: true, credentials: true }));
  app.use(express.json());
  app.use(cookieParser());
  app.use(sessionMiddleware);
  // app.use(limiter);
  app.use(jwtAuth);
};
