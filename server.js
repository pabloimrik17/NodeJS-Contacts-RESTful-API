'use strict';

const http = require('http');

const hostname = 'localhost';
const port = 8080;

const server = http.createServer((request, response) => {

    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/json');
    response.end('<h1>Hello World </h1>');

});

server.listen(port, hostname, () => {

    console.log(`Server running at http://${hostname}:${port}`)

})