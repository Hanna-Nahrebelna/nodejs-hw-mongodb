import Joi from 'joi';

export const contactValidationSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  phone: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().required(),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('work', 'home', 'personal').required()
});

export const contactUpdateValidationSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  phone: Joi.string().min(3).max(20),
  email: Joi.string().email(),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('work', 'home', 'personal')
}).or('name', 'phone', 'email', 'isFavourite', 'contactType');
