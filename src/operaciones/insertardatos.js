import pg from "pg";

export default function insertarDatos() {
  const { Client } = pg;

  let client = new Client({
    user: "postgres",
    host: "localhost",
    database: "bdserver",
    password: "alfonso",
    port: 5432,
  });

  client.connect();

  const query2 = `
INSERT INTO amigos (nick, firstName, lastName, age)
VALUES ('manolo37', 'Manolo', 'Martinez', 21), ('alfonso13', 'Alfonso', 'Lopez', 23), ('juanHD', 'Juan', 'Hernandez', 13)
`;

  client.query(query2, (err, res) => {
    if (err) {
      console.error(err);
      client.end();
      return;
    }
    console.log("Se insertó correctamente");
    client.end();
  });
}
