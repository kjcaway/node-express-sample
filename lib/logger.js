const winston = require('winston');
const process = require('process');

const { combine, timestamp, label, printf } = winston.format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const options = {
  file: {
    level: 'info',
    filename: `/logs/simple-express.log`,
    handleExceptions: true,
    json: false,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
    format: combine(label({ label: 'simple-express' }), timestamp(), myFormat)
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
    format: combine(label({ label: 'simple-express' }), timestamp(), myFormat)
  }
};

let logger = new winston.createLogger({
  transports: [
  ],
  exitOnError: false // do not exit on handled exceptions
});

if (process.env.NODE_ENV === 'production') {
  logger.add(new winston.transports.File(options.file));
} else {
  logger.add(new winston.transports.Console(options.console));
}

module.exports = logger;