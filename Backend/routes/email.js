const express = require("express")
const router = express.Router();

const validarEmail = require("../middlewares/validarEmail")
const sendEmail = require("../controllers/emailController")


router.post("/", validarEmail, sendEmail)


module.exports = router