import Contact from '../models/contact.js';

// Функція для отримання всіх контактів
const getAllContacts = async () => {
  try {
    const contacts = await Contact.find(); // Отримання всіх контактів
    return contacts;
  } catch (error) {
    throw new Error('Error fetching contacts: ' + error.message);
  }
};

export default getAllContacts;
