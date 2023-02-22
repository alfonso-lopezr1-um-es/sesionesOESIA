import jwt from "jsonwebtoken";
const secretKey = "alfonso";

export default function generarToken(datos) {
  console.log(
    "Generando token JWT con tiempo de validez de: " +
      process.env.JWT_EXPIRATION
  );
  const token = jwt.sign(datos, secretKey, {
    expiresIn: process.env.JWT_EXPIRATION,
  });
  return token;
}
