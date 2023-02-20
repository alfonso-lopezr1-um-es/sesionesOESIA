class Persona {
  nick;
  nombre;
  apellido;
  edad;
  constructor(nick, nombre, apellido, password, edad) {
    this.nick = nick;
    this.nombre = nombre;
    this.apellido = apellido;
    this.password = password;
    this.edad = edad;
  }

  toString() {
    return `${this.nick} ${this.nombre} ${this.apellido} ${this.password} ${this.edad}`;
  }
}
export default Persona;
