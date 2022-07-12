let nodemailer = require('nodemailer');
let db = require('../db')
//const datos = require('../productos.json')
const dotenv = require('dotenv');    
dotenv.config();

const inicioGET = function (req, res) {

    let sql = "SELECT * FROM Productos"
    db.query(sql, function(error, data) {
        if (error) res.send(`Ocurrió un error ${error.code}`)
        res.render('index', {  
            titulo: "Mi emprendimiento", 
            productos: data
        })
    })
}

const contactoGET = function (req, res) {
    res.render('contacto')
}

const contactoPOST = function(req, res) {
    // 1. Definir el transportador
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    })
    // 2. Definimos el cuerpo de mail
    console.log("BODY: ", req.body)
    let data = req.body
    let mailOptions = {
        from: data.nombre,
        to: 'galahaye2@gmail.com',
        subject: data.asunto,
        html: `
            <h2>El siguiente mensaje ha llegado de la web</h2>
            <p>${data.mensaje}</p>
        `
    }
    // 3. Enviamos el mail
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error)
            res.status(500, error.message)
            res.status(500).render('contacto', {
                mensaje: `Ha ocurrido el siguiente error: ${error.message}`,
                mostrar: true,
                clase: 'danger'

            })
        } else {
            console.log("E-mail enviado")
            res.status(200).render('contacto', {
                mensaje: `Tu e-mail ha sido enviado correctamente`,
                mostrar: true,
                clase: 'success'
            })
        }
    })
}

const comoComprarGET = function(req,res) {
    res.render('como-comprar')
}

const detalleProductoGET =  function(req,res) {
    res.render('detalle-producto')
}

const sobreNosotrosGET = function(req,res) {
    res.render('sobre-nosotros')
}

module.exports = {
    inicioGET,
    contactoGET,
    contactoPOST,
    comoComprarGET,
    detalleProductoGET,
    sobreNosotrosGET
}