const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;

// Definisikan format log
const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

// Inisialisasi logger dengan format dan transport yang diinginkan
const logger = createLogger({
  format: combine(
    timestamp(),
    logFormat
  ),
  transports: [
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/combined.log' }),
    new transports.Console({ format: format.simple() })
  ],
});

module.exports = logger;
