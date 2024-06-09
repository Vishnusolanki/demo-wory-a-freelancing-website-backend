const mongoose = require('mongoose');
const app = require('./app');
const config = require('./src/config/config');
const logger = require('./src/config/logger');

// Set strictQuery to false if you want to prepare for the default change in Mongoose 7
mongoose.set('strictQuery', false);

let server;

// Connect to MongoDB
mongoose.connect(config.mongoose.url)
// mongoose.connect('mongodb://127.0.0.1:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    logger.info('Connected to MongoDB');
    // Start the Express server after successful MongoDB connection
    server = app.listen(config.port, () => {
      logger.info(`Server is listening on port ${config.port}`);
    });
  })
  .catch((error) => {
    // Handle MongoDB connection error
    logger.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process if unable to connect to MongoDB
  });

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  exitHandler();
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection:', reason);
  exitHandler();
});

// Handle SIGTERM signal
process.on('SIGTERM', () => {
  logger.info('SIGTERM signal received');
  if (server) {
    server.close(() => {
      logger.info('Server closed gracefully');
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
});

// Function to handle process exit
const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};
