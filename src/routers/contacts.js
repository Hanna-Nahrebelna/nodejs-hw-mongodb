import express from 'express';
import { getContacts, getContact, createContact } from '../controllers/contacts.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';

const router = express.Router();

router.get('/contacts', ctrlWrapper(getContacts)); // Маршрут для отримання всіх контактів

router.get('/contacts/:id', ctrlWrapper(getContact)); // Маршрут для отримання одного контакту за ID

router.post('/contacts', createContact); // Новий маршрут для створення контакту

export default router;
