import nodemailer from 'nodemailer';

// 🔹 Configuración global de nodemailer
const transportConfig = {
    host: 'mail.proyectosarg.com',
    port: 587,
    secure: false, // TLS
    auth: {
        user: 'soportetecnico@proyectosarg.com',
        pass: 'D#]_h@;E3_eG' // Usa una contraseña de aplicación
    },
    tls: {
        rejectUnauthorized: false // Evita errores SSL en algunos servidores
    }
};

// 🔹 Función para enviar correo de verificación
export async function enviarCorreoIniciarSesion(user) {
    const id = user._id.toString();
    const transport = nodemailer.createTransport(transportConfig);

    const mensaje = {
        from: 'soportetecnico@proyectosarg.com',
        to: user.email,
        subject: 'Registro de cuenta',
        html: `
            <h1>Bienvenido ${user.name} ${user.lastName}</h1>
            <p>Para verificar su cuenta haga click en el siguiente enlace:</p>
            <a href="https://login-node-production-6343.up.railway.app/verificar/${encodeURIComponent(id)}" target="_blank">
                Verificar cuenta
            </a>
            <p>O copiar y pegar el siguiente enlace en tu navegador:</p>
            <p><b>https://login-node-production-6343.up.railway.app/verificar/${encodeURIComponent(id)}</b></p>
        `
    };

    try {
        const info = await transport.sendMail(mensaje);
        return info.messageId;
    } catch (error) {
        console.error('Error al enviar el correo:', error);
    }
}

// 🔹 Función para enviar correo de recuperación de contraseña
export async function enviarCorreoRecuperacion(correo) {
    const transport = nodemailer.createTransport(transportConfig);

    const mensaje = {
        from: 'soportetecnico@proyectosarg.com',
        to: correo, // 🔹 Ahora usa correctamente el correo del usuario
        subject: 'Recuperación de contraseña',
        html: `
            <h1>Recuperación de contraseña</h1>
            <p>Para cambiar su contraseña, ingrese al siguiente enlace:</p>
            <a href="https://login-node-production-6343.up.railway.app/recuperar/${correo}" target="_blank">
                Recuperar contraseña
            </a>
            <p>O copie y pegue el siguiente enlace en su navegador:</p>
            <p><b>https://login-node-production-6343.up.railway.app/recuperar/${correo}</b></p>
        `
    };

    try {
        const info = await transport.sendMail(mensaje);
        return info.messageId;
    } catch (error) {
        console.error('Error al enviar el correo:', error);
    }
}
