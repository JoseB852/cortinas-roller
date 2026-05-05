require("dotenv").config()
const express = require("express")
const cors = require("cors")

const emailRoutes = require("./routes/email");
const iaRoutes = require("./routes/ia"); 
const manejadorErrores = require("./middlewares/manejadorErorres")


const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static("public"));


app.use("/email", emailRoutes)
app.use("/ia", iaRoutes); 
app.use(manejadorErrores)

const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en puerto ${PORT}`)
})