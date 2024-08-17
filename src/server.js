import express from 'express';
import cors from 'cors';
import pino from 'pino';
import pinoHttp from 'pino-http';
import router from './routers/contacts.js';
import errorHandler from './middlewares/errorHandler.js';
import notFoundHandler from './middlewares/notFoundHandler.js';
import initMongoConnection from './db/initMongoConnection.js'; // Підключення до MongoDB

// Ініціалізуємо обробник http-запитів
const logger = pino();
const pinoMiddleware = pinoHttp({ logger });

// Налаштування сервера
async function setupServer() {
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

  try {
    await initMongoConnection(); // Очікування завершення підключення до MongoDB
    // Запуск сервера на вказаному порту
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });    
  } catch (error) {
    console.error('Error starting the server:', error);
    process.exit(1); // Завершення процесу з помилкою
  }  

  return app;
}

// Виклик для запуску сервера
setupServer(); 