import nodemailer from 'nodemailer';

export async function enviarCorreoIniciarSesion(user) {
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
        to: user.Email,
        subject: 'Registro de cuenta',
        html: `
            <h2>Bienvenido ${user.name} ${user.lastname} </h2>
            <p>Usted se a registrado en el proyecto de login con node js.</p>
            <p>Para verificar su cuenta haga click en el siguiente enlace</p>
            <a href="https://www.ejemplo.com/login" target="_blank">Verificar cuenta</a>
            <p>O copiar y pegar el siguiente enlace en tu navegador:</p>
            <p><b>https://www.ejemplo.com/login</b></p>
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
