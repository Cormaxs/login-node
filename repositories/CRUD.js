import user from '../models/login.js';

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

//verifica si existe ese correo antes de crear la cuenta, si existe devuelve false(correo existente), sino, correo no existente
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
    const usuario = await user.findOne({ email: datos.Email });
    // Verificar si la contraseña es correcta
    if (usuario.password === datos.password && usuario.email === datos.Email) {
        return true; // Credenciales correctas
    } else {
        return false; // Credenciales incorrectas
    }
}



//recuperar contraseña 

export async function cambiarContra(contraseña, correo){
    const cambio = await user.updateMany(
        {email: correo},
        {$set:{password: contraseña}}
    )
    return cambio;
    }

