import Contact from '../models/contact.js';

// Функція для отримання всіх контактів
const getAllContacts = async ({ page, limit }) => {
  try {
    // Ообробка параметрів пагінації при отриманні всіх контактів
    const contacts = await Contact.paginate({}, { page, limit }); 
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

// Функція для оновлення контакту
export const updateContactData = async (id, updateData) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(id, updateData, { new: true });
    return updatedContact;
  } catch (error) {
    throw new Error('Error updating contact: ' + error.message);
  }
};

// Функція для видалення контакту
export const deleteContactById = async (id) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(id);
    return deletedContact;
  } catch (error) {
    throw new Error('Error deleting contact: ' + error.message);
  }
};

export default getAllContacts;
