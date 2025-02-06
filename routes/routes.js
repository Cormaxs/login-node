import express from 'express';
import {validarUsuario, loginControllers, envCorreo, verificarCuentaid,IniciarSesion, 
  recuperarContraseña, CambioC, datosAct, sanitizarDatos, encriptar} from '../controllers/controllers.js';

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

//cambiar password desde correo
router.get('/recuperar/:correo', (req, res)=>{
  res.render('new-password');
  
})


//verificar cuenta por correo
router.get('/verificar/:id', async (req, res)=>{
  const {id} = req.params;
const verificar = await verificarCuentaid(id);
  res.render( `./verificarCuenta`);
})

//actualizar datos
router.get('/actualizar', async (req, res)=>{
 res.render('./update-datos');
})


//rutas de recepcion de datos --------------------------------------------------------------------------------------------

//recibe formulario para crear cuenta
router.post('/login', validarUsuario, sanitizarDatos,  async (req, res)=>{
  const hashear = await encriptar(req.body);
  console.log(hashear);
  const crearUser =  await loginControllers(hashear);
  if(crearUser){
    await envCorreo(crearUser);
    res.status(200).json({ mensaje: 'Solicitud exitosa' });
  }else{
    return res.status(409).json({ message: "El correo ya está registrado" }); // 409 = Conflicto
  }
})


// iniciar sesion
router.post('/sign-in',sanitizarDatos,  async(req, res)=>{
  try {
    const iniciar = await IniciarSesion(req.body);
    if (iniciar) {
        res.status(200).json({ mensaje: "Solicitud exitosa" });
    } else {
        res.status(409).json({ mensaje: "El correo y la contraseña no coinciden" });
    }
} catch (error) {
    console.error("Error en la autenticación:", error);
    res.status(500).json({ mensaje: "el correo no es valido" });
}
})


//recibe los datos de correo de la cuenta a recuperar contraseña, luego manda un correo
router.post('/recover-password', async (req, res) => {
  const verificar = await recuperarContraseña(req.body.Email);
  console.log(verificar);
  if(verificar){
    res.redirect('/sign-in');
  }else{
    res.redirect('/recover-password?Correo no registrado');
  }
})


// cambia la contraseña desde el link del correo
router.post('/recuperar/:correo',async (req, res)=>{
  const hashear = await encriptar(req.body);
  const {correo} = req.params;
  const {password} = hashear;
  console.log(password, correo)
  await CambioC(password, correo)
  res.redirect('/sign-in?cambio de contraseña exitoso');
})



//actualizar datos
router.post('/actualizar', sanitizarDatos, async (req, res)=>{
  const hashear = await encriptar(req.body);
  const datos = hashear;
  console.log(await datosAct(datos));
})




export default router;





