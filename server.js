const express = require('express')
const app = express()
const hbs = require('hbs')
let nodemailer = require('nodemailer')
var path = require('path');
const dotenv = require('dotenv');

require('./helpers/helper'); //es como insertar un pedazo de codigo almacenado en otro archivo
const datos = require('./productos.json')

// Para que tome los datos de los formularios (middleware)
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(express.static('public')); //middleware

//Hbs
app.set('view engine', 'hbs');
app.set('views', [
    path.join('./views/front'),
    path.join('./views/back'),
    path.join('./views'),
]);
hbs.registerPartials(__dirname + '/views/partials');  

//=== FRONT ===
// ruta raíz
app.get('/', function (req, res) {
    //console.log(datos[0].data)
    res.render('index', {
        productos: datos[0].data
    })
})

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
        html: `<h2>El siguiente mensaje ha llegado de la web</h2>
       <p>${data.mensaje}</p>
        `
    }

    // Enviamos el mail
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error)
            res.status(500, error.message)
            res.status(500).render('contacto', {
                mensaje: ` Ha ocurrido el siguiente error: ${error.message}`,
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
})

app.get('/como-comprar', function(req,res){
    res.render('como-comprar')
})
app.get('/detalle-producto', function(req,res){
    res.render('detalle-producto')
})
app.get('/sobre-nosotros', function(req,res){
    res.render('sobre-nosotros')
})

// === ADMIN ===

app.get('/admin', function(req,res){
    res.render('admin')
})
app.get('/agregar-producto', function(req,res){
    res.render('agregar-producto')
})
app.get('/editar-producto', function(req,res){
    res.render('editar-producto')
})
app.get('/login', function(req,res){
    res.render('login')
})

//  404 - no encontrado
app.use(function(req,res){
    res.status(404).render('404')
});

app.listen(3000, function () {
    console.log("El servidor está online en puerto 3000")
})

