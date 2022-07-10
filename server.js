const express = require('express')
const app = express()
const hbs = require('hbs')
let nodemailer = require('nodemailer')

require('./helpers/helper'); //es como insertar un pedazo de codigo almacenado en otro archivo
const datos = require('./productos.json')

// Para que tome los datos de los formularios (middleware)
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

app.set('view engine', 'hbs');

// ruta raíz
app.get('/', function (req, res) {
    //console.log(datos[0].data)
    res.render('index', {
        productos: datos[0].data
    })
})

// contacto
app.get('/contacto', function (req, res) {
    res.render('contacto')
})

app.post('/contacto', function (req, res) {
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
    let data = req.body //lo que va a obtener del formulario
    let mailOptions = {
        from: data.nombre, //propiedades del objeto del formulario (mismos nombres)
        to: 'galahaye2@gmail.com',
        subject: data.asunto,
        text: data.mensaje
    }

    // Enviamos el mail
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error)
            res.status(500, error.message)
            res.status(500).render('contacto', {
                mensaje: ` <div class= "text-center alert alert-danger" role="alert">Ha ocurrido el siguiente error: ${error.message}</div>`
            })
        }else {
            console.log("E-mail enviado")
            res.status(200).render('contacto',{
                mensaje:`<div class= "text-center alert alert-success" role="success">Tu e-mail ha sido enviado correctamente</div>` 
            })
        }
    })
})


app.listen(3000, function () {
    console.log("El servidor está online en puerto 3000")
})