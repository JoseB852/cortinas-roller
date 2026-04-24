const validarEmail = (req, res, next) =>{
    
const {nombre, correo, telefono, mensaje} = req.body

    if(!nombre || !correo || !telefono || !mensaje){
        return res.status(500).json({
            error : "todos los campos son obligatorios"
        })
    }
    next()
}

module.exports = validarEmail;