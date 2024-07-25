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

// іменований експорт функції для отримання контакту за ID
export const getContactById = async (id) => {
  try {
    const contact = await Contact.findById(id); // отримання контакту за ID
    return contact;
  } catch (error) {
    throw new Error('Error fetching contact by ID: ' + error.message);
  }
};

export default getAllContacts;
