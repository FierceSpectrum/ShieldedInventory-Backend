const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);

const sessionMiddleware = session({
  store: new pgSession({
    conString:
      process.env.DATABASE_URL ||
      `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: parseInt(process.env.SESSION_TIMEOUT_MINUTES || "5") * 60 * 1000,
    secure: false,
    httpOnly: true,
    sameSite: "lax",
  },
});

module.exports = sessionMiddleware;
