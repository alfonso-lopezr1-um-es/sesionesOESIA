import pg from "pg";
import express from "express";
import Persona from "./Personas.js";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import generarToken from "./generateToken.js";
import jwt from "jsonwebtoken";
import cors from "cors";

// Requerir express y crear una instancia de ello
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Tmb dotEnv
dotenv.config();

// creamos el cliente
const { Client } = pg;

// Parametros de conexion a la base de datos pasamos por variables de entorno

let client = new Client({
  user: process.env.NOMBRE,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASS,
  port: process.env.PORT,
});

// Se crea la conexion a la base de datos
client.connect();

// CORS para permitir peticiones desde el front
const corsOptions = {
  origin: "http://localhost:4200",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Funcion para verificar si el token proporcionado es valido a la hora de realizar una solicitud
const verificarToken = (req, res, next) => {
  let token = req.headers["authorization"];

  if (!token) {
    return res.status(401).send("No se proporcionó un token de autenticación.");
  }

  try {
    let tokenSinBearer = token.replace("Bearer ", ""); // Remover la palabra "Bearer" del encabezado que si no no va
    let decoded = jwt.verify(tokenSinBearer, process.env.SECRET_KEY); // Verificar token
    next();
  } catch (ex) {
    res.status(400).send("Token no válido.");
    console.log("Token no válido.");
  }
};

// PROCESANDO CON GET OBTENER ALGO

// en la solicitud de root (localhost:3000/)
app.get("/", function (req, res) {
  res.send("<b> Mi primer servidor http express </b>");
});

// En localhost:3000/welcome
app.get("/welcome", function (req, res) {
  res.json("<b>Hola!</b> Bienvenido a mi servidor http hecho con express");
});

//Prueba de alguna funcionalidad, no usar, es solo para testear la funcionalidad
app.get("/prueba", verificarToken, (req, res) => {
  client.query(
    `SELECT NICK, FIRSTNAME, LASTNAME, AGE FROM AMIGOS WHERE AGE > 10`,
    (error, results) => {
      if (error) {
        console.log("Error");
        // Manejar el error de la consulta
        res
          .status(500)
          .send(
            "Estamos teniendo problemas con la tabla. Vuelva en otro momento!"
          );
      } else {
        console.log("Devolviendo resultados");
        res.json(results.rows);
      }
    }
  );
});

// get logo para mostrar una imagen en la pantalla
app.get("/logo", function (req, res) {
  res.send(
    "<img src=" +
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpSpqW52pcUJWsYi9QUzDmuybTM_gxPE5f0ksmMw1XRA5bxN-E62fGA_8E-44Gf2g7mTA&usqp=CAU" +
      "></img>"
  );
});

app.get("/cerrar", function (req, res) {
  client.end();
  console.log("Conexión cerrada");
  res.json("Conexión cerrada");
});

/** 1. Recuperar todos los amigos */
app.get("/amigos", (req, res) => {
  console.log("Recuperando todos los amigos");
  client.query(`SELECT * FROM amigos`, (error, results) => {
    if (error) {
      console.log("Error");
      // Manejar el error de la consulta
      res.status(500).send(`Error al recuperar amigos: ${error.message}`);
    }
    // si hay resultado lo imprimimos
    else if (results.rows.length > 0) {
      console.log("Devuelve todos los amigos");
      // Enviar los resultados de la consulta como respuesta HTTP
      res.json(results.rows);
    }
    // si no lo hay, devolvemos 404
    else {
      console.log("No hay amigos todavia");
      res.status(404).send("<b>404.</b> No existe ningún amigo todavía!");
    }
  });
});

/** 2. Recuperar algunos amigos: solo los mayores de X años  */
app.get("/amigosmayores/:numero", function (req, res) {
  let numero = req.params.numero;
  console.log("Recuperando amigos mayores de " + numero + " años");
  client.query(
    `SELECT NICK,  FIRSTNAME, LASTNAME, AGE
  FROM AMIGOS                                                                
  WHERE AGE > $1`,
    [numero],
    (error, results) => {
      if (error) {
        console.log("Error");
        // Manejar el error de la consulta
        res.status(500).send("Petición incorrecta! Introduce un numero");
      }
      // si hay resultado lo imprimimos
      else if (results.rows.length > 0) {
        console.log("Devolviendo resultados");
        // Enviar los resultados de la consulta como respuesta HTTP
        res.json(results.rows);
      }
      // si no lo hay, devolvemos 404
      else if (results.rows.length === 0) {
        console.log("No existe ningún amigo todavía mayor de esa edad");
        res
          .status(404)
          .send(
            "<b>404.</b> No existe ningún amigo mayor de " +
              numero +
              " todavía!"
          );
      }
    }
  );
});

/** 2.2 Recuperar algunos amigos: solo los mayores de edad  */
app.get("/amigosmayores", function (req, res) {
  console.log("Recuperando amigos mayores de edad");
  client.query(
    `SELECT NICK,  FIRSTNAME, LASTNAME, AGE
  FROM AMIGOS                                                                
  WHERE AGE > 17`,
    (error, results) => {
      if (error) {
        console.log("Error");
        // Manejar el error de la consulta
        res.status(500).send("Petición incorrecta! Introduce un numero");
      }
      // si hay resultado lo imprimimos
      else if (results.rows.length > 0) {
        console.log("Devolviendo resultados");
        // Enviar los resultados de la consulta como respuesta HTTP
        res.json(results.rows);
      }
      // si no lo hay, devolvemos 404
      else if (results.rows.length === 0) {
        console.log("No existe ningún amigo todavía mayor de edad");
        res
          .status(404)
          .send("<b>404.</b> No existe ningún amigo mayor de edad todavía!");
      }
    }
  );
});

/** 3. Recuperar un amigo en concreto con un id especifico */
app.get("/amigos/:nick", function (req, res) {
  let nick = req.params.nick;
  console.log("Buscando amigo con nick " + nick);
  client.query(
    "SELECT * FROM AMIGOS WHERE nick = $1",
    [nick],
    (error, results, fields) => {
      if (error) {
        console.log("Error");
        // Manejar el error de la consulta
        res
          .status(500)
          .send(
            "Estamos teniendo problemas con la tabla. Vuelva en otro momento!"
          );
      }
      // si hay resultado lo imprimimos
      else if (results.rows.length > 0) {
        console.log("Se enccontró al amigo");
        // Enviar los resultados de la consulta como respuesta HTTP
        res.json(results.rows);
      }
      // si no lo hay, devolvemos 404
      else if (results.rows.length === 0) {
        console.log("No existe ningún amigo con ese nick todavia");
        res
          .status(404)
          .send(
            "<b>404.</b> No existe ningún amigo con el nick " +
              nick +
              " todavía!"
          );
      }
    }
  );
});

// PROCESANDO CON POST AÑADIR ALGO

app.post("/", function (req, res) {
  res.send("<b> Mi </b> primer servidor http express");
});

// En localhost:3000/welcome
app.post("/welcome", function (req, res) {
  res.send("<b>Hola!</b> Bienvenido a mi servidor http hecho con express");
});

/** 4. Crear la tabla amigos en la BD */
app.post("/creartabla", function (req, res) {
  console.log("Creando tabla amigos");
  client.query(
    `CREATE TABLE amigos (
    nick varchar primary key NOT NULL,
    firstName varchar,
    lastName varchar,
    password varchar,
    age int);`,
    (error, results) => {
      if (error) {
        console.log("Fallo al crear tabla, probablemente ya existe");
        // Manejar el error de la consulta
        res.status(401).send("No se pudo crear la tabla Amigos!\n" + error);
      }
      // si hay resultado lo imprimimos
      else {
        console.log("Tabla Amigos creada");
        // Enviar los resultados de la consulta como respuesta HTTP
        res.send("Tabla Amigos creada correctamente :D");
      }
    }
  );
});

/** 5. Insertar algunos amigos predeterminados en la tabla */
app.post("/insertaramigos", function (req, res) {
  console.log("Insertando amigos en la tabla");
  client.query(
    `INSERT INTO amigos (nick, firstName, lastName, password, age) VALUES 
('manolo37', 'Manolo', 'Martinez', 'limon', '21'), 
('alfonso13', 'Alfonso', 'Lopez', 'naranja', 23), 
('juanHD', 'Juan', 'Hernandez', 'pera', '13')`,
    (error) => {
      if (error) {
        console.log("Fallo al insertar amigos, probablemente ya existen");
        // Manejar el error de la consulta
        res.status(500).send("No se pudieron insertar los amigos :(\n" + error);
      }
      // si hay resultado lo imprimimos
      else {
        console.log("Se insertaron los amigos correctamente");
        // Enviar los resultados de la consulta como respuesta HTTP
        res.send("Se insertaron los amigos correctamente :D");
      }
    }
  );
});

/** 6. Insertando un nuevo usuario con JSON, deberemos de habernos autenticado previamente */
app.post("/crearamigo", verificarToken, (req, res) => {
  // Obtenemos el objeto persona del JSON
  let persona = new Persona(
    req.body.nick,
    req.body.firstname,
    req.body.lastname,
    req.body.password,
    req.body.age
  );

  console.log("Intentando crear nueva persona: " + persona.nick);

  // Definir la consulta SQL preparada
  let consulta = {
    text: "INSERT INTO amigos (nick, firstName, lastName, password, age) VALUES ($1, $2, $3, $4, $5)",
    values: [
      persona.nick,
      persona.nombre,
      persona.apellido,
      persona.password,
      persona.edad,
    ],
  };

  client.query(consulta, (error, results) => {
    if (error) {
      console.log("Fallo al insertar el nuevo amigo, probablemente ya existe");
      // Manejar el error de la consulta
      res.status(401).send("No se pudo crear el amigo :(\n" + error);
    }
    // si hay resultado lo imprimimos
    else {
      console.log("Se creó el amigo correctamente");
      // Enviar los resultados de la consulta como respuesta HTTP
      res.send("Se creó el amigo correctamente :D");
    }
  });
});

/** 7. Ruta para obtener el token de autenticación de usuario */
app.post("/login", async (req, res) => {
  let usuario = req.body.nick;
  let contraseña = req.body.password;
  console.log(
    "Intentando autenticar usuario: " +
      usuario +
      " con contraseña: " +
      contraseña
  );

  let query = "SELECT * FROM amigos WHERE nick = $1 AND password = $2";
  let values = [usuario, contraseña];
  let { rows } = await client.query(query, values);

  if (rows.length === 0) {
    console.log("Credenciales incorrectas");
    return res.status(401).json("Credenciales incorrectas");
  }
  let datos = { id: rows[0].nick, pass: rows[0].password };
  let token = generarToken(datos);
  console.log("Token generado");
  res.json({ token });
});

// PROCESANDO CON PUT ACTUALIZAR ALGO

app.put("/welcome", function (req, res) {
  res.send("<b>Hola!</b> Bienvenido a mi servidor http hecho con express");
});

/** 8. Por parametro url para actualizar solo la edad*/
app.put("/actualizar/:nick/:edad", function (req, res) {
  let nick = req.params.nick;
  let edad = req.params.edad;
  console.log("Intentando actualizar persona con nick: " + nick);
  client.query(
    ` UPDATE amigos SET age = $1 WHERE nick = $2;`,
    [edad, nick],
    (error, results) => {
      let numModificados = results.rowCount;
      if (error) {
        console.log("Fallo al actualizar info de amigo");
        // Manejar el error de la consulta
        res.status(500).send("No se pudo actualizar el amigo :(\n" + error);
      }
      // si hay resultado lo imprimimos
      else if (numModificados > 0) {
        console.log("Se actualizó el amigo correctamente");
        // Enviar los resultados de la consulta como respuesta HTTP
        res.send(
          "Se actualizó el amigo " +
            nick +
            " con la edad " +
            edad +
            " correctamente :D"
        );
      }
      // si no lo hay, devolvemos 404
      else if (numModificados == 0) {
        console.log("No existe ningún amigo con ese nick todavia");
        res
          .status(404)
          .send(
            "<b>404.</b> No existe ningún amigo con el nick " +
              nick +
              " todavía!"
          );
      }
    }
  );
});

/** 9. Por JSON para actualizar cualquier campo*/
app.put("/actualizar/:nick", function (req, res) {
  let nick = req.params.nick;
  let persona = new Persona(
    req.body.nick,
    req.body.firstname,
    req.body.lastname,
    req.body.password,
    req.body.age
  );

  console.log("Intentando actualizar persona con nick: " + nick);
  client.query(
    ` UPDATE amigos SET firstname = $1, lastname = $2, age = $4, password =$3 WHERE nick = $5;`,
    [persona.nombre, persona.apellido, persona.password, persona.edad, nick],
    (error, results) => {
      let numModificados = results.rowCount;
      if (error) {
        console.log("Fallo al actualizar info de amigo");
        // Manejar el error de la consulta
        res.status(500).send("No se pudo actualizar el amigo :(\n" + error);
      }
      // si hay resultado lo imprimimos
      else if (numModificados > 0) {
        console.log("Se actualizó el amigo correctamente");
        // Enviar los resultados de la consulta como respuesta HTTP
        res.send(
          "Se actualizó el amigo " +
            nick +
            "\nNuevo nombre: " +
            persona.nombre +
            "\nNuevo apellido: " +
            persona.apellido +
            "\nNueva edad: " +
            persona.edad
        );
      }
      // si no lo hay, devolvemos 404
      else if (numModificados == 0) {
        console.log("No existe ningún amigo con ese nick todavia");
        res
          .status(404)
          .send(
            "<b>404.</b> No existe ningún amigo con el nick " +
              nick +
              " todavía!"
          );
      }
    }
  );
});

// PROCESANDO CON DELETE BORRAR ALGO
app.delete("/", function (req, res) {
  res.send("<b> Mi </b> primer servidor http express");
});

app.delete("/welcome", function (req, res) {
  res.send("<b>Hola!</b> Bienvenido a mi servidor http hecho con express");
});

/** 10. Borrando usuario por parametro URL, se requiere autenticación */
app.delete("/borrar/:nick", function (req, res) {
  let nick = req.params.nick;
  console.log("Intentando borrar persona con nick: " + nick);
  client.query(
    ` DELETE FROM amigos WHERE nick = $1;`,
    [nick],
    (error, results) => {
      let numModificados = results.rowCount;
      if (error) {
        console.log("Fallo al eliminar amigo");
        // Manejar el error de la consulta
        res.status(500).send("No se pudo eliminar el amigo :(\n" + error);
      }
      // si hay resultado lo imprimimos
      else if (numModificados > 0) {
        console.log("Se eliminó el amigo correctamente");
        // Enviar los resultados de la consulta como respuesta HTTP
        res.send("Se eliminó el amigo " + nick);
      }
      // si no lo hay, devolvemos 404
      else if (numModificados == 0) {
        console.log("No existe ningún amigo con ese nick todavia");
        res
          .status(404)
          .send(
            "<b>404.</b> No existe ningún amigo con el nick " +
              nick +
              " todavía!"
          );
      }
    }
  );
});

/** 11. Borrar la tabla amigos entera */
app.delete("/borrartabla", function (req, res) {
  console.log("Borrando tabla amigos");
  client.query(`DROP TABLE amigos`, (error) => {
    if (error) {
      console.log("Fallo al borrar la tabla, probablemente ya no existe");
      // Manejar el error de la consulta
      res.status(404).send("No se pudo borrar la tabla Amigos!\n" + error);
    }
    // si hay resultado lo imprimimos
    else {
      console.log("Tabla Amigos borrada");
      // Enviar los resultados de la consulta como respuesta HTTP
      res.send("Tabla Amigos borrada correctamente :D");
    }
  });
});

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
