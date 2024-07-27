import getAllContacts from '../services/contacts.js';
import { getContactById, addContact } from '../services/contacts.js';
import createError from 'http-errors';

export const getContacts = async (req, res, next) => {
  try {
    const contacts = await getAllContacts(); // Отримання всіх контактів з сервісу
    res.status(200).json({
      status: '200',
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (error) {
    next(createError(500, error.message)); // Використання createError для створення помилки
  }
};

export const getContact = async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.id); // Отримання контакту за ID
    if (!contact) {
      return next(createError(404, "Contact not found")); // Використання createError для створення помилки
    } else {
      res.status(200).json({
        status: '200',
        message: 'Contact found',
        data: contact,
      });
    }
  } catch (error) {
    next(createError(500, error.message)); // Використання createError для створення помилки
  }
};

export const createContact = async (req, res, next) => {
  try {
    const { name, phoneNumber, email, isFavourite, contactType } = req.body;

    if (!name || !phoneNumber || !contactType) {
      return next(createError(400, "Name, phoneNumber, and contactType are required"));
    }

    const newContact = await addContact({ name, phoneNumber, email, isFavourite, contactType });

    res.status(201).json({
      status: 201,
      message: 'Successfully created a contact!',
      data: newContact,
    });
  } catch (error) {
    next(createError(500, error.message));
  }
};


