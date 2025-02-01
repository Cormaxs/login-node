# Nombre del Proyecto

Este proyecto es un sistema de Login utilizando **Node.js** y **MongoDB**, basado en la arquitectura **MVC** (Modelo-Vista-Controlador).

---

## 📌 Recorrido de los Datos

1. **Renderizado de la plantilla inicial** desde `views`.
2. **Redirección a la plantilla de Login**, donde se muestra un formulario.
3. **Envío del formulario** a la ruta `/login` con método `POST`.
4. **Paso por el Middleware en `controllers`** para validar los datos.
5. **Si los datos son correctos**, se envían a `controllers`, que los pasa a `services`.
6. **`services` llama a `repositories`**, donde se guardan los datos en la base de datos.

---

## ⚙️ Instrucciones para la Instalación

### 📌 Requisitos

Este proyecto requiere [Node.js](https://nodejs.org/) para su ejecución. Sigue los pasos a continuación para instalarlo.

#### **1. Verificar si Node.js está instalado**

Abre una terminal (CMD, PowerShell o cualquier terminal de tu preferencia) y ejecuta:

```bash
node -v
```

Si Node.js está instalado, verás la versión. Si no lo está, sigue el siguiente paso.

#### **2. Instalar Node.js (si no está instalado)**

- **Windows:** Descarga e instala Node.js desde [aquí](https://nodejs.org/).
- **Linux/macOS:** Usa el siguiente comando para instalarlo con `nvm` (Node Version Manager):

```bash
curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.4/install.sh | bash
source ~/.bashrc
nvm install node
```

Después de instalarlo, verifica nuevamente ejecutando `node -v`.

---

## 📦 Instalación de Dependencias

### 1️⃣ Clonar el Repositorio

Si aún no tienes el proyecto en tu máquina, clónalo con:

```bash
git clone git@github.com:Cormaxs/login-node.git
```

### 2️⃣ Acceder al Proyecto

```bash
cd login-node
```

### 3️⃣ Instalar Dependencias

Ejecuta el siguiente comando dentro del directorio del proyecto:

```bash
npm install
```

Este comando instalará automáticamente todas las dependencias necesarias según el archivo `package.json`.

---

## 🚀 Ejecución del Proyecto

Para iniciar el servidor, usa el siguiente comando:

```bash
npm start
```


El servidor debería estar corriendo en `http://localhost:3000/` (o el puerto definido en tu configuración).

---

## 📂 Estructura del Proyecto

```
📦 Login-node
 ┣ 📂 config
 ┣ 📂 controllers
 ┣ 📂 models
 ┣ 📂 public
 ┣ 📂 repositories
 ┣ 📂 routes
 ┣ 📂 services
 ┣ 📂 views
 ┣ 📜 app.js
 ┣ 📜 package.json
 ┣ 📜 package-lock.json
 ┣ 📜 .env
```
- **`config/`**: Conexion a la base de datos.
- **`controllers/`**: Lógica de controladores.
- **`models/`**: Modelos de la base de datos.
- **`public/`**: Archivos css estaticos.
- **`repositories/`**: Interactua con la base de datos.
- **`routes/`**: Definición de rutas.
- **`services/`**: Servicios que interactúan con los controladores.
- **`views/`**: Archivos de vistas para el frontend.
- **`app.js`**: Archivo principal del servidor.
- **`.env`**: Configuración de variables de entorno.

---

## 🛠 Tecnologías Usadas

- **Node.js** - Entorno de ejecución.
- **Express.js** - Framework para Node.js.
- **MongoDB** - Base de datos NoSQL.
- **Mongoose** - ODM para MongoDB.
- **express-ejs-layouts** - Para layouts.
- **middleware** - 
- **bcryptjs** - Para encriptar contraseñas.
- **express-validator** - Validación de formularios.

---






