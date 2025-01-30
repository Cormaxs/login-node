import {crearUser} from '../repositories/CRUD.js';

export async function loginServices(datos){
   const repositories = crearUser(datos);
   console.log("respuesta desde services services", repositories);
}