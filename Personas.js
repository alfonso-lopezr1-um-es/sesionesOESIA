class Persona {
  nick;
  nombre;
  apellido;
  edad;
  constructor(nick, nombre, apellido, edad) {
    this.nick = nick;
    this.nombre = nombre;
    this.apellido = apellido;
    this.edad = edad;
  }

  toString() {
    return `${this.nick} ${this.nombre} ${this.apellido} ${this.edad}`;
  }
}
export default Persona;
