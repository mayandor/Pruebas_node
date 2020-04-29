const express = require('express');
const  app = express();

app.get('/',(req,res) => {
    res.send('recivido...');
});
app.post('/',(req,res) => {
    res.send('guardado...');
});
app.put('/',(req,res) => {
    res.send('actualizando...');
});
app.delete('/',(req,res) => {
    res.send('eliminando...');
});

app.listen(3000, () =>{
    console.log('server on port 3000');
});
