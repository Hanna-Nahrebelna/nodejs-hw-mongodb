import express from 'express';
import cors from 'cors';
import pino from 'pino';
import pinoHttp from 'pino-http';
import getContacts from './controllers/contactController.js';
import { getContact } from './controllers/contactController.js';

// Ініціалізуємо обробник http-запитів
const logger = pino();
const pinoMiddleware = pinoHttp({ logger });

// Налаштування сервера
function setupServer() {
  const app = express();
  app.use(cors()); // Використання CORS
  
  app.use(pinoMiddleware); // Використання Pino для логування

  // Простий маршрут
  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  // Маршрут для перевірки здоров'я сервера
  app.get('/health', (req, res) => {
    res.json({ status: 'UP' });
  });
  
  // Маршрут для отримання всіх контактів
  app.get('/contacts', getContacts);

  // Маршрут для отримання одного контакту за ID
  app.get('/contacts/:id', getContact);
  
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
