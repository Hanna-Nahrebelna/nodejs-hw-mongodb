import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true        
    },
    isFavourite: {
        type: Boolean,
        default: false
    },
    contactType: {
        type: String,
        enum: ['work', 'home', 'personal'],
        default: 'personal',
        required: true
    }
}, {
    timestamps: true // Автоматичне створення createdAt та updatedAt
});

// Підключення плагіна пагінації
contactSchema.plugin(mongoosePaginate);

// Створення моделі
const Contact = mongoose.model('Contact', contactSchema);

export default Contact;