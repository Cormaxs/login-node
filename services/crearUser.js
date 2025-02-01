import {crearUser} from '../repositories/CRUD.js';

export async function loginServices(datos){
   const repositories = await  crearUser(datos);
  //console.log("respuesta desde services services", repositories);
 // console.log("respositories", repositories);
 return repositories;
}