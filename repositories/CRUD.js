import user from '../models/login.js';


export async function crearUser(datos) { // si no pudo crearse devuelve false, si se creo devuelve true
    try {
        const buscarEmail = await user.findOne({ email: datos.Email });
        if (buscarEmail) {
            
           return false;
        }else{
            const nuevoUsuario = new user({ email: datos.Email, password: datos.password });
            const usuarioGuardado = await nuevoUsuario.save();
            return true;
        }
    } catch (error) {
       // console.error("❌ Error al crear usuario:", error);
        return { success: false, message: "Error en la creación del usuario." };
    }
}


