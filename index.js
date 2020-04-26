const http = require('http');
const url = require('url');
const fs = require('fs');
const querystring = require('querystring');

const mime = {
    'html': 'text/html',
    'css': 'text/css',
    'jpg': 'image/jpg',
    'ico': 'image/x-icon',
    'mp3': 'audio/mpeg3',
    'mp4': 'video/mp4'
};

const servidor = http.createServer((pedido, respuesta) => {
    const objetourl = url.parse(pedido.url);
    let camino = 'public' + objetourl.pathname;
    if (camino == 'public/')
        camino = 'public/index.html';
    encaminar(pedido, respuesta, camino);
});

servidor.listen(8888);

function encaminar(pedido, respuesta, camino) {
    switch (camino) {
        case 'public/cargar':
            {
                grabarUsuarios(pedido, respuesta);
                break;
            }
        case 'public/listaDeUsuarios':
            {
                verUsuarios(respuesta);
                break;
            }
        default:
            {
                fs.stat(camino, error => {
                    if (!error) {
                        fs.readFile(camino, (error, contenido) => {
                            if (error) {
                                respuesta.writeHead(500, { 'Content-Type': 'text/plain' });
                                respuesta.write('Error interno');
                                respuesta.end();
                            } else {
                                const vec = camino.split('.');
                                const extension = vec[vec.length - 1];
                                const mimearchivo = mime[extension];
                                respuesta.writeHead(200, { 'Content-Type': mimearchivo });
                                respuesta.write(contenido);
                                respuesta.end();
                            }
                        });
                    } else {
                        respuesta.writeHead(404, { 'Content-type': 'text/html' });
                        respuesta.write('<!doctype html><html><head></head><body>Recurso inexistente</body></html>');
                        respuesta.end();
                    }
                });
            }
    }
}

function grabarUsuarios(pedido, respuesta) {
    let info = '';
    pedido.on('data', datosparciales => {
        info += datosparciales;
    });
    pedido.on('end', function() {
        const formulario = querystring.parse(info);
        respuesta.writeHead(200, { 'Content-Type': 'text/html' });
        const pagina = `<!doctype html><html><head></head><body>
            Nombre:${formulario['nombre']}<br>
            Email:${formulario['email']}<br>
            <a href="index.html">Retornar</a>
            </body></html>`;
        respuesta.end(pagina);
        grabarEnArchivo(formulario);
    });
}

function grabarEnArchivo(formulario) {
    const datos = `nombre: ${formulario['nombre']}<br>
    email:${formulario['email']}<hr>`;
    fs.appendFile('public/registro_usuarios.txt', datos, error => {
        if (error)
            console.log(error);
    });
}

function verUsuarios(respuesta) {
    fs.readFile('public/registro_usuarios.txt', (error, datos) => {
        respuesta.writeHead(200, { 'Content-Type': 'text/html' });
        respuesta.write('<!doctype html><html><head></head><body>');
        respuesta.write(datos);
        respuesta.write('</body></html>');
        respuesta.end();
    });
}

console.log('Servidor web iniciado');