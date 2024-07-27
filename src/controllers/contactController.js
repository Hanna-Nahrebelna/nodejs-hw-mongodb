import getAllContacts from '../services/contacts.js';
import { getContactById } from '../services/contacts.js';

const getContacts = async (req, res) => {
  try {
    const contacts = await getAllContacts(); // Отримання всіх контактів з сервісу
    res.status(200).json({
      status: '200',
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({
      status: '500',
      message: 'Error fetching contacts',
    });
  }
};

export const getContact = async (req, res) => {
  try {
    const contact = await getContactById(req.params.id); // Отримання контакту за ID
    if (contact) {
      res.status(200).json({
        status: '200',
        message: 'Contact found',
        data: contact,
      });
    } else {
      res.status(404).json({
        status: '404',
        message: 'Contact not found',
      });
    }
  } catch (error) {
    res.status(500).json({
      status: '500',
      message: 'Error fetching contact',
    });
  }
};

export default getContacts;

