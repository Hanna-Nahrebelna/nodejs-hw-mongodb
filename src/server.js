import express from 'express';
import cors from 'cors';
import pino from 'pino';
import pinoHttp from 'pino-http';

// Ініціалізуємо логер
const logger = pino();
const pinoMiddleware = pinoHttp({ logger });

// Налаштування сервера
function setupServer() {
  const app = express();
  app.use(cors()); // Використання CORS
  
  app.use(pinoMiddleware); // Використання Pino для логування
  
  // Обробка неіснуючих маршрутів
  app.use((req, res, next) => {
    res.status(404).json({ message: 'Not found' });
  });

  // Запуск сервера
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  return app;
}

export default setupServer;
