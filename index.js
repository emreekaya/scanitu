const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("./config/db");
const morgan = require("morgan");
const cors = require("cors");
const logger = require("./utils/logger");
const routes = require("./routes");
const session = require("express-session");
const passport = require("passport");
const samlRoutes = require("./routes/auth/login-saml");
const { securityHeaders, rateLimiter } = require("./middleware");
const app = express();
const path = require('path');

// Load environment variables
require('dotenv').config();

// * Database connection
mongoose.set("strictQuery", false);
var db = mongoose.connection;
db.on("error", (error) => {
  logger.error("Database connection error", { error: error.message });
});
db.once("open", function () {
  logger.info("Database connected successfully");
});

// * Security Headers
app.use(securityHeaders);

// * Rate Limiting - More restrictive for auth routes
app.use('/api/auth', rateLimiter(15 * 60 * 1000, 5)); // 5 requests per 15 minutes for auth
app.use('/api', rateLimiter(15 * 60 * 1000, 100)); // 100 requests per 15 minutes for API

// * Cors - Configure for production
const corsOptions = {
  origin: process.env.NODE_ENV === 'production'
    ? ['https://yourdomain.com'] // Add your production domains
    : true, // Allow all in development
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// * Security & Body Parser
app.use(bodyParser.json({ limit: '10mb' })); // Limit request size
app.use(express.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(morgan("short"));
app.use(logger.httpLogger()); // Custom logger
app.use('/data', express.static(path.join(__dirname, 'data')));

// * Session
app.use(session({
  secret: process.env.SESSION_SECRET || 'fallback-secret-change-in-production',
  resave: false,
  saveUninitialized: false, // Better security
  cookie: {
    secure: process.env.NODE_ENV === 'production', // HTTPS only in production
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    httpOnly: true // Prevent XSS
  }
}));

// * Passport
app.use(passport.initialize());
app.use(passport.session());

// * Api routes
app.use("/api", routes);
app.use("/api/auth", samlRoutes);
app.get("/", (req, res) => {
  console.log("hello");
  res.send("hello");
});

// * Global Error Handler
app.use((err, req, res, next) => {
  logger.error('Application Error', {
    error: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    ip: req.ip
  });

  // Don't leak error details in production
  const message = process.env.NODE_ENV === 'production'
    ? 'Internal Server Error'
    : err.message;

  res.status(err.status || 500).json({
    status: err.status || 500,
    message: message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  });
});

// * 404 Handler
app.use("*", (req, res) => {
  res.status(404).json({ status: 404, message: "Route not found" });
});

let PORT = process.env.PORT || 3030;
let HOST = process.env.HOST || "0.0.0.0"


app.listen(PORT,HOST, () => {
  logger.info(`Server started successfully`, {
    port: PORT,
    host: HOST,
    environment: process.env.NODE_ENV || 'development'
  });
});
