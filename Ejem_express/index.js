const express = require('express');
const  app = express();

// Ruta metodo GET deveulve la cadena "recivido..."
app.get('/',(req,res) => {
    res.send('recivido...');
});

// Ruta metodo GET deveulve la cadena "guardado..."
app.post('/',(req,res) => {
    res.send('guardado...');
});

// Ruta metodo GET deveulve la cadena "actualizando..."
app.put('/',(req,res) => {
    res.send('actualizando...');
});

// Ruta metodo GET deveulve la cadena "eliminando..."
app.delete('/',(req,res) => {
    res.send('eliminando...');
});

// servidor en el puerto 3000 => http://localhost:3000/
app.listen(3000, () =>{
    console.log('server on port 3000');
});
