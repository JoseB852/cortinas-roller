
const transporter = require("../config/mailer")


const sendEmail = async (req, res, next) => {

    try {
        const {nombre, correo, telefono, mensaje } = req.body

        const mailOptions = {
            from : "cortinaslenox@gmail.com",
            to : "cortinaslenox@gmail.com",
            text : `
                Nombre: ${nombre}
                Número: ${telefono}
                Correo: ${correo}
                Mensaje: ${mensaje}
            `
        }

        await transporter.sendMail(mailOptions)

        return res.status(200).json({
            message : "Correo,enviado exitosamente"
        })

        
    } catch (error) {
        next(error)
    }
}

module.exports = sendEmail