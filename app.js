import express from 'express';
import router from './routes/routes.js';
import path from 'path';
import expressLayouts from 'express-ejs-layouts';
import {connectDB} from './config/db.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//sirve archivos estaticos como css
app.use(express.static(path.join(process.cwd(), 'public')));
// Configurar motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'views')); // Asegúrate de tener la carpeta 'views'
// Usar Express-Layouts
app.use(expressLayouts);


connectDB();

app.use('/', router);

app.listen(PORT, ()=>{
    console.log(`Servidor escuchando en el puerto ${PORT}`);
})