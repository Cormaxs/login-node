import user from '../models/login.js';

//creo el usuario si no esta creado anteriormente
export async function crearUser(datos) { 
    try {
        const buscarEmail = await user.findOne({ email: datos.Email });
        if (buscarEmail) {
            
           return false;
        }else{
            const nuevoUsuario = new user({
                name: datos.name,
                lastName: datos.lastname,
                numberPhone: datos.numberPhone,
                email: datos.Email, 
                password: datos.password });
            const usuarioGuardado = await nuevoUsuario.save();
            return usuarioGuardado;
        }
    } catch (error) {
        return { success: false, message: "Error en la creación del usuario." };
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