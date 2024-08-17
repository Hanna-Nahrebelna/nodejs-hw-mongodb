import express from 'express';
import {
  getContacts,
  getContact,
  createContact,
  modifyContact,
  removeContact
} from '../controllers/contacts.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';

const router = express.Router();

router.get('/contacts', ctrlWrapper(getContacts)); // Маршрут для отримання всіх контактів

router.get('/contacts/:id', ctrlWrapper(getContact)); // Маршрут для отримання одного контакту за ID

router.post('/contacts', ctrlWrapper(createContact)); // Новий маршрут для створення контакту

router.patch('/contacts/:id', ctrlWrapper(modifyContact)); // Маршрут для оновлення контакту

router.delete('/contacts/:id', ctrlWrapper(removeContact)); // Маршрут для видалення контакту

export default router;
