const fs = require('fs');
const path = require('path');

// Create logs directory if it doesn't exist
const logDir = path.join(__dirname, '..', 'logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// Log levels
const LOG_LEVELS = {
  ERROR: 0,
  WARN: 1,
  INFO: 2,
  DEBUG: 3
};

class Logger {
  constructor() {
    this.logLevel = process.env.LOG_LEVEL || 'INFO';
  }

  formatMessage(level, message, meta = {}) {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      level,
      message,
      ...meta
    };
    return JSON.stringify(logEntry) + '\n';
  }

  writeToFile(filename, message) {
    try {
      const filePath = path.join(logDir, filename);
      fs.appendFileSync(filePath, message);
    } catch (error) {
      console.error('Error writing to log file:', error);
    }
  }

  shouldLog(level) {
    const currentLevel = LOG_LEVELS[this.logLevel.toUpperCase()] || LOG_LEVELS.INFO;
    const messageLevel = LOG_LEVELS[level.toUpperCase()] || LOG_LEVELS.INFO;
    return messageLevel <= currentLevel;
  }

  error(message, meta = {}) {
    if (!this.shouldLog('ERROR')) return;

    const logMessage = this.formatMessage('ERROR', message, meta);
    console.error(`🔴 ${message}`, meta);
    this.writeToFile('error.log', logMessage);
    this.writeToFile('combined.log', logMessage);
  }

  warn(message, meta = {}) {
    if (!this.shouldLog('WARN')) return;

    const logMessage = this.formatMessage('WARN', message, meta);
    console.warn(`🟡 ${message}`, meta);
    this.writeToFile('combined.log', logMessage);
  }

  info(message, meta = {}) {
    if (!this.shouldLog('INFO')) return;

    const logMessage = this.formatMessage('INFO', message, meta);
    console.log(`ℹ️ ${message}`, meta);
    this.writeToFile('combined.log', logMessage);
  }

  debug(message, meta = {}) {
    if (!this.shouldLog('DEBUG')) return;

    const logMessage = this.formatMessage('DEBUG', message, meta);
    console.log(`🐛 ${message}`, meta);
    this.writeToFile('debug.log', logMessage);
    this.writeToFile('combined.log', logMessage);
  }

  // HTTP request logger middleware
  httpLogger() {
    return (req, res, next) => {
      const startTime = Date.now();

      res.on('finish', () => {
        const duration = Date.now() - startTime;
        const logData = {
          method: req.method,
          url: req.url,
          statusCode: res.statusCode,
          duration: `${duration}ms`,
          userAgent: req.get('user-agent'),
          ip: req.ip || req.connection.remoteAddress,
          timestamp: new Date().toISOString()
        };

        if (res.statusCode >= 500) {
          this.error('HTTP Request Error', logData);
        } else if (res.statusCode >= 400) {
          this.warn('HTTP Request Warning', logData);
        } else {
          this.info('HTTP Request', logData);
        }
      });

      next();
    };
  }

  // Database operation logger
  dbLogger(operation, collection, data = {}) {
    this.info('Database Operation', {
      operation,
      collection,
      ...data
    });
  }

  // Authentication logger
  authLogger(event, userId, details = {}) {
    this.info('Authentication Event', {
      event,
      userId,
      ...details
    });
  }
}

// Create singleton instance
const logger = new Logger();

module.exports = logger;