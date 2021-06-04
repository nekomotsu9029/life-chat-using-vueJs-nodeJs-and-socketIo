//requerimos nuestros modulos
const express = require('express');
const socket = require('./socket/socket.js');
const path = require('path');

//inicializamos express y definimos el puerto
const app = express();
app.set('port', process.env.PORT || 3000 );

//definimos la carpeta publica con la ayuda del modulo path para unir directorios
app.use(express.static( path.join(__dirname, 'public') ));

//montamos el servidor en la variable http
const http = require('http').createServer(app);

//montamos el socket como middleware para que este a la escucha
socket(http);

//ponemos el servidor a la escucha de peticiones
http.listen(app.get('port'), ()=>{
    console.log('El servidor esta a la escucha de peticiones en el puerto', app.get('port'));
});