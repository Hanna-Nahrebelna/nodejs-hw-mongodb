import { getContactById, addContact, updateContactData, deleteContactById} from '../services/contacts.js';
import createHttpError from 'http-errors';
import Contact from '../models/contact.js';


// Контролер для отримання всіх контактів

export const getContacts = async (req, res, next) => {   
  const { page = 1, perPage = 10, sortBy = 'name', sortOrder = 'asc', type, isFavourite } = req.query;

  const pageNumber = parseInt(page, 10);
  const perPageNumber = parseInt(perPage, 10);

  const filter = {};
    if (type) {
        filter.contactType = type;
    }
    if (isFavourite !== undefined) {
        filter.isFavourite = isFavourite === 'true';
    }

    const options = {
        page: pageNumber,
        limit: perPageNumber,
        sort: { [sortBy]: sortOrder === 'desc' ? -1 : 1 },
    };

    const result = await Contact.paginate(filter, options);

    res.status(200).json({
        status: 200,
        message: "Successfully found contacts!",
        data: {
            data: result.docs,
            page: result.page,
            perPage: result.limit,
            totalItems: result.totalDocs,
            totalPages: result.totalPages,
            hasPreviousPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage
        }
    });  
};

// Контролер для отримання контакту за ID
export const getContact = async (req, res, next) => {
    const contact = await getContactById(req.params.id);
    if (!contact) {
      throw createHttpError(404, 'Contact not found');
  }  

  const page = 2;
  const perPage = 4;
  const totalItems = 6;
  const totalPages = Math.ceil(totalItems / perPage);
  
  
      res.status(200).json({
        status: 200,
        message: `Successfully found contact with id ${contact}!`,
        data: contact,
        page: page,
        perPage: perPage,
        totalItems: totalItems,
        totalPages: totalPages,
        hasPreviousPage: page > 1,
        hasNextPage: page < totalPages
      });
};

// Контролер для створення нового контакту
export const createContact = async (req, res, next) => {
    const { name, phoneNumber, email, isFavourite, contactType } = req.body;

  if (!name || !phoneNumber || !contactType) {
      throw createHttpError(400, "Name, phoneNumber, and contactType are required");
    }

    const newContact = await addContact({ name, phoneNumber, email, isFavourite, contactType });

    res.status(201).json({
      status: 201,
      message: `Successfully created a contact!`,
      data: newContact,
    });  
};

// Контролер для оновлення існуючого контакту
export const modifyContact = async (req, res, next) => {
  const contactId = req.params.id;
  const { phoneNumber } = req.body;    

  if (!phoneNumber) {
    throw createHttpError(404, "Contact not found");      
  }

  const updatedContact = await updateContactData(contactId, req.body);

  if (!updatedContact) {            
    return next(createHttpError(404, 'Contact not found'));
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
    throw createHttpError(404, "Contact not found");      
  }  

    res.status(204).send(); // Успішне видалення контакту, відповідь без тіла
};

