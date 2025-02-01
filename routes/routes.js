import express from 'express';
import {validarUsuario, loginControllers, envCorreo, verificarCuentaid} from '../controllers/controllers.js';
const router = express.Router();

//rutas de peticion
router.get('/',(req,res)=>{
res.render('inicio');
})

//creacion de cuenta
router.get('/login', async (req, res) => {
  res.render('login');
})

//inicio de sesion
router.get('/sign-in', (req, res) => {
    res.render("sign-in");
})

//recuperar contraseña
router.get('/recover-password', (req, res) => {
    res.render("recover-password");
})



//rutas de recepcion de datos

router.post('/login', validarUsuario,  async (req, res)=>{
  const crearUser =  await loginControllers(req.body);
  if(crearUser){
    await envCorreo(req.body);
    res.redirect("./login?cuenta creada con exito");
  }else{
    res.redirect("./login?El correo ya esta registrado, intente de nuevo");
  }
})


//rutas de envio








//rutas de actualizacion



//verificar cuenta por correo
router.get('/verificar/:id', async (req, res)=>{
  const {id} = req.params;
const verificar = await verificarCuentaid(id);
  res.render( `./verificarCuenta`);
})

export default router;





