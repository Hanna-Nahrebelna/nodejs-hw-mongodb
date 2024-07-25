import getAllContacts from '../services/contacts.js';
import { getContactById } from '../services/contacts.js';

const getContacts = async (req, res) => {
  try {
    const contacts = await getAllContacts(); // Отримання всіх контактів з сервісу
    res.status(200).json({
      status: 'number',
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error fetching contacts',
    });
  }
};

export const getContact = async (req, res) => {
  try {
    const contact = await getContactById(req.params.id); // Отримання контакту за ID
    if (contact) {
      res.status(200).json({
        status: 'number',
        message: 'Contact found',
        data: contact,
      });
    } else {
      res.status(404).json({
        status: 'error',
        message: 'Contact not found',
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error fetching contact',
    });
  }
};

export default getContacts;

