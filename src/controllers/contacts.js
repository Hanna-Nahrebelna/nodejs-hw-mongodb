import getAllContacts from '../services/contacts.js';
import { getContactById, addContact, updateContactData, deleteContactById} from '../services/contacts.js';
import createError from 'http-errors';

// Контролер для отримання всіх контактів
export const getContacts = async (req, res, next) => {
  try {
    const { page = 1, perPage = 10, sortBy = 'name', sortOrder = 'asc', type, isFavourite } = req.query;
    
    // фільтрація контактів за типом та улюбленими контактами
    const filter = {};
    if (type) filter.contactType = type;
    if (isFavourite !== undefined) filter.isFavourite = isFavourite === 'true';
    
    const options = {
      page: parseInt(page),
      limit: parseInt(perPage),
      sort: { [sortBy]: sortOrder === 'asc' ? 1 : -1 },
    };

    const contacts = await getAllContacts(filter, options);

    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts.docs, // Масив контактів з поточної сторінки
      page: contacts.page,
      perPage: contacts.limit,
      totalItems: contacts.totalDocs,
      totalPages: contacts.totalPages,
      hasPreviousPage: contacts.hasPrevPage,
      hasNextPage: contacts.hasNextPage,
    });
  } catch (error) {
    next(createError(500, error.message));
  }
};

// Контролер для отримання контакту за ID
export const getContact = async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.id); 
    if (!contact) {
      return next(createError(404, "Contact not found"));
    } else {
      res.status(200).json({
        status: 200,
        message: 'Contact found',
        data: contact,
      });
    }
  } catch (error) {
    next(createError(500, error.message));
  }
};

// Контролер для створення нового контакту
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

// Контролер для оновлення існуючого контакту
export const modifyContact = async (req, res, next) => {
  try {
    const contactId = req.params.id;
    const updateData = req.body;

    const updatedContact = await updateContactData(contactId, updateData);

    if (!updatedContact) {
      return next(createError(404, 'Contact not found'));
    }

    res.status(200).json({
      status: 200,
      message: 'Successfully patched a contact!',
      data: updatedContact,
    });
  } catch (error) {
    next(createError(500, error.message));
  }
};

// Контролер для видалення існуючого контакту
export const removeContact = async (req, res, next) => {
  try {
    const contactId = req.params.id;
    const deleted = await deleteContactById(contactId);

    if (!deleted) {
      return next(createError(404, 'Contact not found'));
    }

    res.status(204).send(); // Успішне видалення контакту, відповідь без тіла
  } catch (error) {
    next(createError(500, error.message));
  }
};

