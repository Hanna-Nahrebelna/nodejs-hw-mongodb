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

// Функція для створення нового контакту
export const addContact = async (contactData) => {
  try {
    const contact = new Contact(contactData);
    await contact.save(); // Збереження контакту в базі даних
    return contact;
  } catch (error) {
    throw new Error('Error creating contact: ' + error.message);
  }
};

export default getAllContacts;
