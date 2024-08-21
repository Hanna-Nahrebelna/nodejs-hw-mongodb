import initMongoConnection from './db/initMongoConnection.js';
import setupServer from './server.js';

// Підключаємося до MongoDB
initMongoConnection()
  .then(() => setupServer()) // Запуск сервера після встановлення з'єднання з БД
  .catch((error) => {
    console.error("Failed to initialize MongoDB connection:", error);
  });

