const http = require("http");
const https = require("https");

const PORT = 3000;

function obtenerChiste(callback) {
  https.get("https://official-joke-api.appspot.com/random_joke", (respuesta) => {
    let datos = "";

    respuesta.on("data", (chunk) => {
      datos += chunk;
    });

    respuesta.on("end", () => {
      try {
        const json = JSON.parse(datos);
        callback(null, { setup: json.setup, punchline: json.punchline });
      } catch (error) {
        callback(error, null);
      }
    });

  }).on("error", (error) => {
    callback(error, null);
  });
}

const server = http.createServer((req, res) => {
  console.log("Petición recibida en:", req.url);  // <-- Debug

  if (req.url === "/chiste") {
    obtenerChiste((error, chiste) => {
      if (error) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ mensaje: "Error al obtener el chiste", error: error.message }));
      } else {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ mensaje: "Chiste obtenido", chiste }));
      }
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Ruta no encontrada");
  }
});

server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});