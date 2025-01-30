# Nombre del Proyecto
El proyecto es un Login con nodejs y mongodb, usando la arquitectura MVC (Modelo Vista Controlador).

# Recorrido de los datos
Empieza renderizando la plantilla inicio desde views, nos redirigimos a la plantilla login que nos devuelve un formulario.
Al completar el formulario manda a la ruta login(post) la cual accede al middleware en controllers, una ves verificado los datos, mando a controllers, de ahi paso los datos a servicios para llamar a repositories y guardarlo

# Instrucciones para la Instalación

## Requisitos

Este proyecto requiere [Node.js](https://nodejs.org/) para su ejecución. A continuación te indicamos cómo instalarlo.

### 1. Verificar si Node.js está instalado

Abre una terminal (CMD, PowerShell, o terminal de tu preferencia) y ejecuta el siguiente comando : 'node -v' para verificar si ya tienes Node.js 

# Si Node.js no está instalado

## En windows
Ve a la página oficial de Node.js: https://nodejs.org/ descargarlo y volver a verificar si se instalo correctamente

# Instrucciones para Instalar Dependencias

Para instalar las dependencias de este proyecto, sigue estos pasos:

### 1. Clona el repositorio

Si aún no tienes el repositorio en tu máquina, clónalo utilizando el siguiente comando:

```bash
git clone https://github.com/tuusuario/tu-repositorio.git

