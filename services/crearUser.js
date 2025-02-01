import {crearUser, guardarIdCorreo, verificarCuentarepo} from '../repositories/CRUD.js';
import {enviarCorreoIniciarSesion} from '../controllers/correo.js';

//creo el usuario
export async function loginServices(datos){
   const repositories = await  crearUser(datos);
 return repositories;
}


//pongo id de correo enviado
export async function verificarCuenta(user){
  const verificado =  await enviarCorreoIniciarSesion(user);
  await guardarIdCorreo(user.Email, verificado);
  return verificado;
}

//verifico cuenta desde correo link
export async function verificarCuentaId(id){
       const verificar = await verificarCuentarepo(id);
       return verificar;
}