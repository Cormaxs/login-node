import user from '../models/login.js';


export async function crearUser(datos){
    try{
        const nuevoUsuario = new user({email: datos.Email, password: datos.password});
        // Guardar el nuevo usuario en la base de datos
         const usuarioGuardado = await nuevoUsuario.save();
         console.log(usuarioGuardado);
         
    }catch(error){
        console.error('error al crear usuario', error);
    }
}