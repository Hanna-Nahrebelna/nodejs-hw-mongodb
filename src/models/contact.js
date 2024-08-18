import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const contactSchema = new mongoose.Schema({
    name: String,
    phoneNumber: String,
    email: String,
    isFavourite: Boolean,
    contactType: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Підключення плагіна пагінації
contactSchema.plugin(mongoosePaginate);

// Створення моделі
const Contact = mongoose.model('Contact', contactSchema);

export default Contact;