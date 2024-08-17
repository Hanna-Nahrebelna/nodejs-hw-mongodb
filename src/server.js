import express from 'express';
import cors from 'cors';
import pino from 'pino';
import pinoHttp from 'pino-http';
import router from './routers/contacts.js';
import errorHandler from './middlewares/errorHandler.js';
import notFoundHandler from './middlewares/notFoundHandler.js';

// Ініціалізуємо обробник http-запитів
const logger = pino();
const pinoMiddleware = pinoHttp({ logger });

// Налаштування сервера
function setupServer() {
  const app = express();
  app.use(cors()); // Використання CORS (обробка запитів з інших доменів)
  app.use(express.json()); // Middleware для автоматичного розпізнавання JSON у запита
  app.use(pinoMiddleware); // Middleware для логування запитів за допомогою Pino

  // Простий маршрут
  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  // Маршрут для перевірки здоров'я сервера
  app.get('/health', (req, res) => {
    res.json({ status: 'UP' });
  });

  // Маршрути контактів
  app.use('/', router); // для всіх маршрутів контактів  
  
  // Middleware для обробки неіснуючих маршрутів
  app.use(notFoundHandler);

  // Middleware для обробки помилок
  app.use(errorHandler);

  // Запуск сервера на вказаному порту
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  return app;
}

// Додайте цей виклик для запуску сервера
setupServer(); 