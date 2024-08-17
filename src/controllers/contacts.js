import getAllContacts from '../services/contacts.js';
import { getContactById, addContact, updateContactData, deleteContactById } from '../services/contacts.js';

// Контролер для отримання всіх контактів
export const getContacts = async (req, res, next) => {
  const contacts = await getAllContacts();
  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

// Контролер для отримання контакту за ID
export const getContact = async (req, res, next) => {
  const contact = await getContactById(req.params.id); 
  if (!contact) {
    return res.status(404).json({
      status: 404,
      message: 'Contact not found',
      data: contact,
    });
  }
  res.status(200).json({
    status: 200,
    message: 'Contact found',
    data: contact,
  });
};

// Контролер для створення нового контакту
export const createContact = async (req, res, next) => {
  console.log('Request body:', req.body); // Логування запиту

  const newContact = await addContact(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: newContact,
  });
};

// Контролер для оновлення існуючого контакту
export const modifyContact = async (req, res, next) => {
  const contactId = req.params.id;
  const updatedContact = await updateContactData(contactId, req.body);

  if (!updatedContact) {
    return res.status(404).json({
      status: 404,
      message: 'Contact not found',
      data: null
    });
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
    return res.status(404).json({
      status: 404,
      message: 'Contact not found',
      data: null
    });
  }

  res.status(204).send(); // Успішне видалення контакту, відповідь без тіла
};
