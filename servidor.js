// http sirve para crear un servidor web
import http from 'http';
// fs sirve para leer y escribir archivos
import fs from 'fs';

// Función para dar la bienvenida
function darBienvenida(req, res) {
  fs.readFile('bienvenida.html', 'utf8', (error, data) => {
    if (error) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Oh no!!!!');
      return;
    }
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);
  });
}

// Función para obtener los datos de las escuelas
function getEscuelas(req, res) {
  const escuelas = [
    { "nombre": "Escuela Benito Juárez", "direccion": "Av. Principal 123, Ciudad de México" },
    { "nombre": "Escuela Secundaria Técnica No. 2 “Juan de Dios Bátiz”", "direccion": "Av. de los Maestros S/N, San Rafael, Cuauhtémoc, Ciudad de México, CDMX" }
  ];
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(escuelas));
}

// Función para mostrar la página de Escuelas
function mostrarEscuelas(req, res) {
  fs.readFile('escuelas.html', 'utf8', (error, data) => {
    if (error) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Oh no!!!!');
      return;
    }
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);
  });
}

// Función para mostrar la página de Donantes
function mostrarDonantes(req, res) {
  fs.readFile('donantes.html', 'utf8', (error, data) => {
    if (error) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Oh no!!!!');
      return;
    }
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);
  });
}

// Función para obtener los datos de los donantes
function getDonantes(req, res) {
  const donantes = [
    { "nombre": "Esteban", "cantidad": "$60,000" },
    { "nombre": "Juan Pablo", "cantidad": "$50,000" }
  ];
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(donantes));
}

// Función para manejar rutas 404
function manejarRuta404(req, res) {
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('¡Ups! Página no encontrada. 🕵️‍♂️');
}

// Rutas adicionales

// Ruta para mostrar el equipo
function mostrarEquipo(req, res) {
  fs.readFile('equipo.html', 'utf8', (error, data) => {
    if (error) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Oh no!!!!');
      return;
    }
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);
  });
}

// Ruta para mostrar la opinión
function mostrarOpinion(req, res) {
  fs.readFile('opinion.html', 'utf8', (error, data) => {
    if (error) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Oh no!!!!');
      return;
    }
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);
  });
}

const servidor = http.createServer((req, res) => {
  const url = req.url;

  if (url === '/') {
    darBienvenida(req, res);
  } else if (url === '/api/escuelas') {
    getEscuelas(req, res);
  } else if (url === '/api/donantes') {
    getDonantes(req, res);
  } else if (url === '/escuelas') {
    mostrarEscuelas(req, res);
  } else if (url === '/donantes') {
    mostrarDonantes(req, res);
  } else if (url === '/equipo') {
    mostrarEquipo(req, res);
  } else if (url === '/opinion') {
    mostrarOpinion(req, res);
  } else {
    manejarRuta404(req, res);
  }
});

const puerto = 1984;
servidor.listen(puerto, () => {
  console.log(`Servidor escuchando en el puerto ${puerto}`);
});