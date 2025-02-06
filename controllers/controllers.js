import { body, validationResult } from 'express-validator';
import {loginServices, verificarCuenta, verificarCuentaId, emailUnicoServices, 
    iniciarSesionServices, recuperarC, cambioContraa, updatedatos} from '../services/crearUser.js';
import {emailUnico} from '../repositories/CRUD.js';
import bcrypt from "bcrypt";

export const encriptarPassword = async (password) => {
    const saltRounds = 10; // Número de rondas para generar el hash
    return await bcrypt.hash(password, saltRounds);
};

export const compararPassword = async (passwordIngresada, passwordEncriptada) => {
    return await bcrypt.compare(passwordIngresada, passwordEncriptada);
};


//middleware, valida los datos para crear la cuenta
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


export const  sanitizarDatos = (req, res, next) =>{
    if (req.body && typeof req.body === "object") {
        Object.keys(req.body).forEach(key => {
            if (typeof req.body[key] === "string" && key!== 'password') {
                req.body[key] = req.body[key].toLowerCase();
            }
        });
    }
    next();
}



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

//actualizar datos
export async function datosAct(datos){
    return await updatedatos(datos);
}


//encripto contraseña
export async function encriptar(datos){
    try {
        if (!datos.password) {
            throw new Error("El campo 'password' es obligatorio");
        }
        const saltRounds = 10;
        const passwordEncriptada = await bcrypt.hash(datos.password, saltRounds);
        
        // Retornar un nuevo objeto en lugar de modificar el original
        return { ...datos, password: passwordEncriptada };

    } catch (error) {
        console.error("Error al encriptar la contraseña:", error);
        return { success: false, message: "No se pudo encriptar la contraseña." };
    }
}


//verifico contraseña hasheada
export async function copararHash(ingreso, almacenado){
   return await bcrypt.compare(ingreso, almacenado);
}