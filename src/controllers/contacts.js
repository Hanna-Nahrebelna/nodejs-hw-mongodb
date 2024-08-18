import createHttpError from 'http-errors';
import getAllContacts from '../services/contacts.js';
import { getContactById, addContact, updateContactData, deleteContactById } from '../services/contacts.js';

// Контролер для отримання всіх контактів
export const getContacts = async (req, res) => {
  const contacts = await getAllContacts();
  res.status(200).json({
    status: 200,
    message: 'Successfully! Contacts found',
    data: contacts,
  });
};

// Контролер для отримання контакту за ID
export const getContact = async (req, res, next) => {
  const contactData = await getContactById(req.params.id);
    
  if (!contactData) {
    throw createHttpError(404, 'Contact not found');
  }
  res.status(200).json({
    status: 200,
    message: 'Successfully! Contact found',
    data: contactData,
  });
};

// Контролер для створення нового контакту
export const createContact = async (req, res, next) => {
  const { name, phoneNumber, email, isFavourite, contactType } = req.body;  

  const newContact = await addContact({ name, phoneNumber, email, isFavourite, contactType });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: newContact,
  });
};

// Контролер для оновлення існуючого контакту
export const modifyContact = async (req, res, next) => {
  const contactId = req.params.id;
  const { phoneNumber } = req.body;

  if (!phoneNumber) {    
    throw createHttpError(400, 'phoneNumber is required');
  }

  const updatedContact = await updateContactData(contactId, req.body);

  if (!updatedContact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: updatedContact,
  });
};

// Контролер для видалення існуючого контакту
export const removeContact = async (req, res, next) => {
  const contactId = req.params.id;
  const deleted = await deleteContactById(contactId);

  if (!deleted) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(204).send(); // Успішне видалення контакту, відповідь без тіла
};
