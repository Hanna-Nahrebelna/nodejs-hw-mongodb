import express from 'express';
import cors from 'cors';
import pino from 'pino';
import pinoHttp from 'pino-http';
import { getContacts, getContact, createContact, modifyContact, removeContact } from './controllers/contacts.js';

// Ініціалізуємо обробник http-запитів
const logger = pino();
const pinoMiddleware = pinoHttp({ logger });

// Налаштування сервера
function setupServer() {

  const app = express();
  
  app.use(cors()); // Використання CORS
  app.use(express.json()); // Middleware для автоматичного розпізнавання JSON у запитах
  app.use(pinoMiddleware); // Middleware для логування запитів за допомогою Pino

  // Простий маршрут
  app.get('/', (_req, res) => {
    res.send('Hello World!');
  });
  
  app.get('/health', (_req, res) => {res.json({ status: 'UP' });}); // Маршрут для перевірки здоров'я сервера
  app.get('/contacts', getContacts); // Маршрут для отримання всіх контактів
  app.get('/contacts/:id', getContact); // Маршрут для отримання одного контакту за ID
  app.post('/contacts', createContact); // Маршрут для створення нового контакту
  app.patch('/contacts/:id', modifyContact); // Маршрут для оновлення існуючого контакту
  app.delete('/contacts/:id', removeContact); // Маршрут для видалення існуючого контакту
  
  app.use((_req, res, _next) => {
    res.status(404).json({ message: 'Not found' });
  }); // Обробка неіснуючих маршрутів

  // Запуск сервера
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  return app;
}

export default setupServer;
