// Requerir express y crear una instancia de ello
import express from "express";
import Persona from "./Personas.js";
import bodyParser from "body-parser";

var app = express();

let personas = [];
let Juan = new Persona("Juan", "Perez", 25);
personas.push(Juan);

// PROCESANDO CON GET OBTENER ALGO

/*console.log(Juan);
console.log(personas);*/

// recuperar todos los amigos
app.get("/amigos", function (req, res) {
  let persona;
  let total = "Lista de amigos registrados: ";
  let i = 1;
  console.log(personas);
  for (let valor of personas) {
    persona = valor;
    console.log(persona);
    total += i + ". " + persona.nombre + " " + persona.apellido + " ";
    i++;
  }
  res.send(total);
});

// recuperar un amigo en concreto, faltaría verificar que cada nombre es unico
app.get("/amigos/:nombre", function (req, res) {
  let nombre = req.params.nombre;
  let persona;
  for (let valor of personas) {
    if (valor.nombre === nombre) {
      persona = valor;
      res.send(persona);
      return;
    }
  }
  res.send("No existe ese amigo todavía!");
});

// en la solicitud de root (localhost:3000/)
app.get("/", function (req, res) {
  res.send("<b> Mi </b> primer servidor http express");
});

// En localhost:3000/welcome
app.get("/welcome", function (req, res) {
  res.json("<b>Holi</b> Bienvenido a mi servidor http hecho con express");
});

// get logo
app.get("/logo", function (req, res) {
  res.send(
    "<img src=" +
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpSpqW52pcUJWsYi9QUzDmuybTM_gxPE5f0ksmMw1XRA5bxN-E62fGA_8E-44Gf2g7mTA&usqp=CAU" +
      "></img>"
  );
});

// PROCESANDO CON POST AÑADIR ALGO

app.post("/", function (req, res) {
  res.send("<b> Mi </b> primer servidor http express");
});

// En localhost:3000/welcome
app.post("/welcome", function (req, res) {
  res.send("<b>Holi</b> Bienvenido a mi servidor http hecho con express");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/crear", (req, res) => {
  let persona = new Persona(req.body.nombre, req.body.apellido, req.body.edad);
  console.log("Nueva persona: " + persona);
  personas.push(persona);
  res.send(
    `<p>Se ha creado el objeto! ${persona.nombre} ${persona.apellido} </p>`
  );
});

// PROCESANDO CON PUT ACTUALIZAR ALGO

// por parametro url para actualizar solo la edad
app.put("/actualizar/:nombre/:edad", function (req, res) {
  let nombre = req.params.nombre;
  let edad = req.params.edad;
  let persona;

  for (let valor of personas) {
    if (valor.nombre === nombre) {
      persona = valor;
      persona.edad = edad;
      res.send(persona);
    } else {
      res.send("No existe ese amigo todavía!");
    }
  }
});

// por JSON para actualizar cualquier campo
app.put("/actualizar/:nombre", function (req, res) {
  let nombre = req.params.nombre;
  let persona = new Persona(req.body.nombre, req.body.apellido, req.body.edad);
  console.log("Nueva persona: " + persona);
  for (let i = 0; i < personas.length; i++) {
    if (personas[i].nombre === nombre) {
      delete personas[i];
      personas[i] = persona;
      res.send(persona);
      return;
    } else {
      res.send("No existe ese amigo todavía!");
    }
  }
});

app.put("/welcome", function (req, res) {
  res.send("<b>Holi</b> Bienvenido a mi servidor http hecho con express");
});

// PROCESANDO CON DELETE BORRAR ALGO
app.delete("/", function (req, res) {
  res.send("<b> Mi </b> primer servidor http express");
});

app.delete("/welcome", function (req, res) {
  res.send("<b>Holi</b> Bienvenido a mi servidor http hecho con express");
});

// por parametro url
app.delete("/borrar/:nombre", function (req, res) {
  let nombre = req.params.nombre;
  let i = 0;
  for (let valor of personas) {
    if (valor.nombre === nombre) {
      personas.splice(i, 1);
      res.send("Borrando la persona " + valor.nombre);
      return;
    }

    i++;
  }
  res.send("No existe ese amigo todavía!");
});

// por JSON, no tiene sentido la vd
/*
app.delete("/borrar", function (req, res) {
  let persona = new Persona(req.body.nombre, req.body.apellido, req.body.edad);

  for (let i = 0; i < personas.length; i++) {
    if (personas[i].nombre === persona.nombre) {
      personas.splice(i, 1);
      res.send("Borrando la persona " + personas[i].nombre);
      return;
    }
    res.send("No existe ese amigo todavía!");
  }
});*/

// Cambiar el mensaje 404 cuando una peticion sea incorrecta
app.use(function (req, res, next) {
  res
    .status(404)
    .send("Lo siento, esa ruta no existe. Que tengas un buen día :)");
});

// inicie el servidor en el puerto 3000
app.listen(3000, function () {
  console.log("Aplicación de ejemplo escuchando en el puerto 3000.");
});
