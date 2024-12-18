import Joi from 'joi';

export const createUserSchema = Joi.object({
  name: Joi.string().min(2).max(100).required().messages({
    'string.min': 'Nome deve ter pelo menos 2 caracteres',
    'string.max': 'Nome não pode exceder 100 caracteres',
    'any.required': 'Nome é obrigatório',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Email inválido',
    'any.required': 'Email é obrigatório',
  }),
  password: Joi.string().min(6).max(50).required().messages({
    'string.min': 'Senha deve ter pelo menos 6 caracteres',
    'string.max': 'Senha não pode exceder 50 caracteres',
    'any.required': 'Senha é obrigatória',
  }),
  birthdate: Joi.date().iso().max('now').required().messages({
    'date.base': 'Data de nascimento inválida',
    'date.max': 'Data de nascimento não pode ser no futuro',
    'any.required': 'Data de nascimento é obrigatória',
  }),
});

export const updateUserSchema = Joi.object({
  name: Joi.string().min(2).max(100).optional().messages({
    'string.min': 'Nome deve ter pelo menos 2 caracteres',
    'string.max': 'Nome não pode exceder 100 caracteres',
  }),
  email: Joi.string().email().optional().messages({
    'string.email': 'Email inválido',
  }),
});
