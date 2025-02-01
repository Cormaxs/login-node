import mongoose from "mongoose"

 const userSchema = new mongoose.Schema({
      idCreacion:{
        type: String, 
        require: false
      },
  name:{
      type:String,
      require:true,
      unique:false
    },
    lastName:{
      type:String,
      require:true,
      unique:false
    },
    numberPhone:{
      type:Number,
      require:true,
      unique:false
    },
    email: {
        type: String,
        required: true,  // El email es obligatorio
        unique: true,    // El email debe ser único en la base de datos
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']  // Validación del formato del email
      },
      password: {
        type: String,
        required: true,  // La contraseña es obligatoria
        minlength: 6     // La contraseña debe tener al menos 6 caracteres
      },
      cuentaVerificada:{
        verificaca: Boolean
      },
      createdAt: {
        type: Date,
        default: Date.now  // Fecha de creación por defecto
      }
      
});
// Crear el modelo basado en el esquema
const user = mongoose.model('user', userSchema, 'usuarios');

export default user;