import pg from "pg";

export default function conectar() {
  const { Client } = pg;
  let client = new Client({
    user: "postgres",
    host: "localhost",
    database: "bdserver",
    password: "alfonso",
    port: 5432,
  });
}

client.connect();
console.log("Conectado!");
client.end();
