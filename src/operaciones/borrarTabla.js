import pg from "pg";

export default function borrarTabla() {
  const { Client } = pg;

  let client = new Client({
    user: "postgres",
    host: "localhost",
    database: "bdserver",
    password: "alfonso",
    port: 5432,
  });

  client.connect();

  const query = `DROP TABLE amigos `;

  client
    .query(query)
    .then((res) => {
      console.log("Se ha borrado la tabla amigos");
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      client.end();
    });
}
