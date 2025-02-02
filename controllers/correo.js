import nodemailer from 'nodemailer';

export async function enviarCorreoIniciarSesion(user) {
    const id = user._id.toString();
    const config = {
        host: 'mail.proyectosarg.com',
        port: 465,
        secure: true, // false para usar TLS
        auth: {
            user: 'soportetecnico@proyectosarg.com',
            pass: 'D#]_h@;E3_eG' // Usa una contraseña de aplicación
        }
    };
const mensaje = {
    from: 'soportetecnico@proyectosarg.com',
    to: user.email,
    subject: 'Registro de cuenta',
    html: `
        <h1>Bienvenido ${user.name} ${user.lastName}</h1>
        <p>Para verificar su cuenta haga click en el siguiente enlace:</p>
        <a href="https://login-node-tbw8.onrender.com/verificar/${encodeURIComponent(id)}" target="_blank">
            Verificar cuenta
        </a>
        <p>O copiar y pegar el siguiente enlace en tu navegador:</p>
        <p><b>https://login-node-tbw8.onrender.com/verificar/${encodeURIComponent(id)}</b></p>
    `
};


    const transport = nodemailer.createTransport(config);

    try {
        const info = await transport.sendMail(mensaje);
        return info.messageId;
    } catch (error) {
        console.error('Error al enviar el correo:', error);
    }
}

//enviarCorreoIniciarSesion('tomasbarros076@gmail.com');
