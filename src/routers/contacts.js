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

router.route('/contacts')
  .get(ctrlWrapper(getContacts)) // Маршрут для отримання всіх контактів
  .post(validateBody(contactValidationSchema), ctrlWrapper(createContact)); // Новий маршрут для створення контакту

router.route('/contacts/:id')
  .get(isValidID, ctrlWrapper(getContact)) // Маршрут для отримання одного контакту за ID
  .patch(isValidID, validateBody(contactUpdateValidationSchema), ctrlWrapper(modifyContact)) // Маршрут для оновлення контакту
  .delete(isValidID, ctrlWrapper(removeContact)); // Маршрут для видалення контакту

export default router;
