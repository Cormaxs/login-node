import {crearUser, guardarIdCorreo, verificarCuentarepo, emailUnico, iniciarSesionRepo, cambiarContra, actualizarDatos} from '../repositories/CRUD.js';
import {enviarCorreoIniciarSesion, enviarCorreoRecuperacion} from '../controllers/correo.js';

//creo el usuario
export async function loginServices(datos){
   const repositories = await  crearUser(datos);
 return repositories;
}

//verifico si el correo es unico
export async function emailUnicoServices(email){
  const unico = await emailUnico(email);
  if(unico){
   throw new Error("El correo ya está registrado"); // ⚠️ Lanza un error si el email existe
  }
  
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


//iniciar sesion
export async function iniciarSesionServices(datos){
  const validos = iniciarSesionRepo(datos);
  return validos;
}

//recuperar contraseña envio correo
export async function recuperarC(correo){
  return await enviarCorreoRecuperacion(correo);
}

//cambio contraseña desde gmail
export async function cambioContraa(contraseña, correo){
 const si = await cambiarContra(contraseña, correo)
}

//actualizar datos
export async function updatedatos(datos){
  return await actualizarDatos(datos);
}


