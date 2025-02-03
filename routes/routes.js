import express from 'express';
import {validarUsuario, loginControllers, envCorreo, verificarCuentaid,IniciarSesion} from '../controllers/controllers.js';
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
  //console.log(crearUser)
  if(crearUser){
    //const id =  crearUser._id.toString();
    await envCorreo(crearUser);
    res.status(200).json({ mensaje: 'Solicitud exitosa' });
  }else{
    return res.status(409).json({ message: "El correo ya está registrado" }); // 409 = Conflicto
  }
})


// iniciar sesion
router.post('/sign-in', async(req, res)=>{
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

//rutas de envio








//rutas de actualizacion



//verificar cuenta por correo
router.get('/verificar/:id', async (req, res)=>{
  const {id} = req.params;
const verificar = await verificarCuentaid(id);
  res.render( `./verificarCuenta`);
})

export default router;





