import express from 'express';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = 1984;

// Middleware para servir archivos estáticos
app.use(express.static('public'));

// Función para leer archivos HTML
const readHTMLFile = (filePath, res) => {
    fs.readFile(path.join(__dirname, filePath), 'utf8', (error, data) => {
        if (error) {
            res.status(500).send('Oh no!!!!');
            return;
        }
        res.send(data);
    });
};

// Rutas
app.get('/', (req, res) => readHTMLFile('bienvenida.html', res));
app.get('/escuelas', (req, res) => readHTMLFile('escuelas.html', res));
app.get('/donantes', (req, res) => readHTMLFile('donantes.html', res));
app.get('/equipo', (req, res) => readHTMLFile('equipo.html', res));
app.get('/opinion', (req, res) => readHTMLFile('opinion.html', res));

// API endpoints
app.get('/api/escuelas', (req, res) => {
    const escuelas = [
        { "nombre": "Escuela Benito Juárez", "direccion": "Av. Principal 123, Ciudad de México" },
        { "nombre": "Escuela Secundaria Técnica No. 2 “Juan de Dios Bátiz”", "direccion": "Av. de los Maestros S/N, San Rafael, Cuauhtémoc, Ciudad de México, CDMX" }
    ];
    res.json(escuelas);
});

app.get('/api/donantes', (req, res) => {
    const donantes = [
        { "nombre": "Esteban", "cantidad": "$60,000" },
        { "nombre": "Juan Pablo", "cantidad": "$50,000" }
    ];
    res.json(donantes);
});

// Manejo de rutas 404
app.use((req, res) => {
    res.status(404).send('¡Ups! Página no encontrada. 🕵️‍♂️');
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
