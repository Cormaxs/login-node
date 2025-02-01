import express from 'express';
import {validarUsuario, loginControllers} from '../controllers/controllers.js';
const router = express.Router();

//rutas de peticion
router.get('/',(req,res)=>{
res.render('inicio');
})

router.get('/login', async (req, res) => {
  res.render('login');
})

router.get('/sign-in', (req, res) => {
    res.render("sign-in");
})

router.get('/recover-password', (req, res) => {
    res.render("recover-password");
})


//rutas de recepcion de datos

router.post('/login', validarUsuario,  async (req, res)=>{
  //const { Email, password } = req.body;
  const crearUser =  await loginControllers(req.body);
  console.log("User routes",crearUser);
  if(crearUser){
    res.redirect("./login?cuenta creada con exito");
  }else{
    res.redirect("./login?El correo ya esta registrado, intente de nuevo");
  }
})




export default router;






//rutas de envio








//rutas de actualizacion