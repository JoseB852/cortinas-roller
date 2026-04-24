const manejadorErrores = (req, res, err) =>{
    console.error(err)
    return res.status(500).json({
        error : "Error en el servidor"
    })

}

module.exports = manejadorErrores