import pg from "pg";

export default function crearTabla() {
  const { Client } = pg;
  let client = new Client({
    user: "postgres",
    host: "localhost",
    database: "bdserver",
    password: "alfonso",
    port: 5432,
  });

  client.connect();
  const query = `
CREATE TABLE amigos (
    nick varchar primary key NOT NULL,
    firstName varchar,
    lastName varchar,
    age int
);
`;

  client
    .query(query)
    .then((res) => {
      console.log("Se ha creado la tabla amigos");
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      client.end();
    });
}
