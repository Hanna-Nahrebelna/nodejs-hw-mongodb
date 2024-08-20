import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
    {
        name: {
        type: String,
        required: true,
        },
        phoneNumber: {
        type: String,
        required: true,
        },
        email: {
        type: String,
        required: true,
        },
        isFavourite: {
        type: Boolean,
        required: true,
        default: false,
        },
        contactType: {
        type: String,
        required: true,        
        },
    },
    {
    timestamps: true,
  },
);

// Створення моделі
const Contact = mongoose.model('Contact', contactSchema); // collection: contacts

export default Contact;