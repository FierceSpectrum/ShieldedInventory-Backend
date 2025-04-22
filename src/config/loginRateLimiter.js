const rateLimit = require("express-rate-limit");

const loginLimiter  = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 5,
  keyGenerator: (req) => req.ip,
  skipSuccessResponse: true,
  handler: (req, res) => {
    res.status(429).json({
      error: "Too many requests, please try again later.",
    });
  },
});

module.exports = loginLimiter ;
