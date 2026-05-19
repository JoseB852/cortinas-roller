const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (req, res, next) => {

    try {

        const { nombre, correo, telefono, mensaje } = req.body;

        await resend.emails.send({

            from: "onboarding@resend.dev",
            to: "cortinaslenox@gmail.com",
            subject: "Nuevo mensaje de contacto",
            html: `
                <h2>Nuevo mensaje</h2>
                <p><strong>Nombre:</strong> ${nombre}</p>
                <p><strong>Correo:</strong> ${correo}</p>
                <p><strong>Teléfono:</strong> ${telefono}</p>
                <p><strong>Mensaje:</strong> ${mensaje}</p>
            `
        });

        return res.status(200).json({
            ok: true,
            message: "Correo enviado exitosamente"
        });

    } catch (error) {

        console.log(error);

        next(error);
    }
};

module.exports = sendEmail;