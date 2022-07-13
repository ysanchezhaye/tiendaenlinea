const express = require('express')
const app = express()
const hbs = require('hbs')
var path = require('path');
require('./helpers/helper'); //es como insertar un pedazo de codigo almacenado en otro archivo


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

// cargamos el archivo de las rutas
app.use('/', require('./routes/rutas'))

//  404 - no encontrado
app.use(function(req,res){
    res.status(404).render('404')
});


app.listen(3010, function () {
    console.log("El servidor está online en puerto 3010")
})

