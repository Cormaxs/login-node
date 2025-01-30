import { body, validationResult } from 'express-validator';
import {loginServices} from '../services/crearUser.js';

//middleware
export const validarUsuario = [
    // Validar que el email sea válido
    body('Email').isEmail().withMessage('El correo no es válido'),

    // Validar la contraseña con requisitos de seguridad
    body('password')
        .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres')
        .matches(/[A-Z]/).withMessage('La contraseña debe contener al menos una letra mayúscula')
        .matches(/[0-9]/).withMessage('La contraseña debe contener al menos un número')
        .matches(/[\W_]/).withMessage('La contraseña debe contener al menos un carácter especial'),

    // Middleware para manejar errores
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next(); // Si no hay errores, continuar al controlador
    }
];


export async function loginControllers(datos){
    console.log('controllers', datos.Email, datos.password)
    const services = loginServices(datos);
    console.log("respuesta services desde controllers", services );
}