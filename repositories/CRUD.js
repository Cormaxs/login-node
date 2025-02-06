import user from '../models/login.js';
import {copararHash} from '../controllers/controllers.js';


//creo el usuario si no esta creado anteriormente
export async function crearUser(datos) { 
    try {
            const nuevoUsuario = new user({
                name: datos.name,
                lastName: datos.lastname,
                numberPhone: datos.numberPhone,
                email: datos.Email, 
                password: datos.password });
            const usuarioGuardado = await nuevoUsuario.save();
            return usuarioGuardado;
    } catch (error) {
        return { success: false, message: "Error en la creación del usuario." };
    }
}

//verifica si existe ese correo antes de crear la cuenta
export async function emailUnico(email) {
    const buscarEmail = await user.findOne({ email: email });
    if (buscarEmail) {
        return true;
    }
}

//guardo el id de creacion de cuenta del correo enviado 
export async function guardarIdCorreo(email, verificado){
    try {
        const guardarIdCorreo = await user.updateMany(
            {email: email}, 
            { $set: { idCreacion: verificado } } 
        );

        return guardarIdCorreo;
    } catch (error) {
        console.error("Error al actualizar idCreacion:", error);
        throw error;
    }
}


//verificar cuenta desde el correo
export async function verificarCuentarepo(id){
    const verificada = await user.updateMany(
        {_id: id},
        {$set: {cuentaVerificada : true}}
    )
    return verificada;
}


//iniciar sesion 
export async function iniciarSesionRepo(datos) {
    try{
    const usuario = await user.findOne({ email: datos.Email });

    const ver = await copararHash(datos.password, usuario.password);
    // Verificar si la contraseña es correcta
    if(ver && usuario.email === datos.Email) {
        return true; // Credenciales correctas
    } else {
        return false; // Credenciales incorrectas
    }
    }catch(err){
        return err;
    }
    
}



//recuperar contraseña, la cambio desde el link del correo
export async function cambiarContra(contraseña, correo){
    const cambio = await user.updateMany(
        {email: correo},
        {$set:{password: contraseña}}
    )
    return cambio;
    }


//actualizar datos
export async function actualizarDatos(datos) {
    try {
        // Intentar actualizar el usuario basado en su email
        const actualizar = await user.updateOne(
            { email: datos.Email }, // Buscar por correo
            { $set: datos } // Actualizar los campos con los nuevos datos
        );

        // Verificar si se actualizó correctamente
        if (actualizar.matchedCount === 0) {
            return { success: false, message: "Usuario no encontrado." };
        }

        return { success: true, message: "Usuario actualizado correctamente." };
    } catch (error) {
        console.error("Error al actualizar usuario:", error);
        return { success: false, message: "Error en la actualización del usuario." };
    }
}
