import { body, validationResult } from 'express-validator';
import {loginServices, verificarCuenta, verificarCuentaId, emailUnicoServices, iniciarSesionServices, recuperarC, cambioContraa} from '../services/crearUser.js';
import {emailUnico} from '../repositories/CRUD.js';

//middleware
export const validarUsuario = [
    body('Email').isEmail().withMessage('El correo no es válido').custom(emailUnicoServices),
    body('password')
        .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres')
        .matches(/[A-Z]/).withMessage('La contraseña debe contener al menos una letra mayúscula')
        .matches(/[0-9]/).withMessage('La contraseña debe contener al menos un número')
        .matches(/[\W_]/).withMessage('La contraseña debe contener al menos un carácter especial'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next(); // Si no hay errores, continuar al controlador
    }
];



//mando a services para crear el user
export async function loginControllers(datos){
    const services = await loginServices(datos);
   return services;
}

//enviar correo verificacion services
export async function envCorreo(user){
   const verificar = await verificarCuenta(user);
   return verificar;
}

//verificar cuenta id services
export async function verificarCuentaid(id){
    const verificar = await verificarCuentaId(id);
    return verificar;
}


//iniciar sesion
export async function IniciarSesion(datos){
    return iniciarSesionServices(datos);
}

// recupero contraseña, verifico y envio correo de recuperacion a el gmail
export async function recuperarContraseña(correo){
   const correoValido = await emailUnico(correo);
   if(correoValido){
    return await recuperarC(correo);
   }else{
    return false;
   }
}


//cambio la nueva contraseña desde el correo
export async function CambioC(contraseña, correo){
   return await cambioContraa(contraseña, correo);
}