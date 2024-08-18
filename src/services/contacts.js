import Contact from '../models/contact.js';

// Функція для отримання всіх контактів
export const getAllContacts = async (filter, options = {}) => {
    const { page = 1, limit = 10, sortBy = 'name', sortOrder = 'asc' } = options;
    const skip = (page - 1) * limit;

    const docs = await Contact.find(filter)
        .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
        .skip(skip)
        .limit(limit);
    
    const totalDocs = await Contact.countDocuments(filter);

    return { docs, totalDocs };
};

// іменований експорт функції для отримання контакту за ID
export const getContactById = async (id) => {
    const contact = await Contact.findById(id); // отримання контакту за ID
    return contact;
};

// Функція для створення нового контакту
export const addContact = async (contactData) => {
    const contact = new Contact(contactData);
    await contact.save(); // Збереження контакту в базі даних
    return contact;
};

// Функція для оновлення контакту
export const updateContactData = async (id, updateData) => {
    const updatedContact = await Contact.findByIdAndUpdate(id, updateData, { new: true });
    return updatedContact;
};

// Функція для видалення контакту
export const deleteContactById = async (id) => {
    const deletedContact = await Contact.findByIdAndDelete(id);
    return deletedContact;
};

export default getAllContacts;
