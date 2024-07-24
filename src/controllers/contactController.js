import getAllContacts from '../services/contacts.js';

const getContacts = async (req, res) => {
  try {
    const contacts = await getAllContacts(); // Отримання всіх контактів з сервісу
    res.status(200).json({
      status: 'success',
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

export default getContacts;

