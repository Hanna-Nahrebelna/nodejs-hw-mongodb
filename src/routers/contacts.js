import express from 'express';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import {
  getContacts,
  getContact,
  createContact,
  modifyContact,
  removeContact
} from '../controllers/contacts.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidID } from '../middlewares/isValidID.js';
import { contactValidationSchema, contactUpdateValidationSchema } from '../validators/contactValidation.js';

const router = express.Router();

router.get('/contacts', ctrlWrapper(getContacts)); // Маршрут для отримання всіх контактів
router.get('/contacts/:id', isValidID, ctrlWrapper(getContact)); // Маршрут для отримання одного контакту за ID
router.post('/contacts', validateBody(contactValidationSchema), ctrlWrapper(createContact)); // Новий маршрут для створення контакту
router.patch('/contacts/:id', isValidID, validateBody(contactUpdateValidationSchema), ctrlWrapper(modifyContact)); // Маршрут для оновлення контакту
router.delete('/contacts/:id', isValidID, ctrlWrapper (removeContact)); // Маршрут для видалення контакту

export default router;
