import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-actualizaredad',
  templateUrl: './actualizaredad.component.html',
  styleUrls: ['./actualizaredad.component.css']
})
export class ActualizaredadComponent {

    nombreUsuario: string = '';
    edadUsuario: string = '';
    respuesta: any;

    constructor(private http: HttpClient) {}

    onSubmit(nick: string, edad: string) {
      try {
        console.log(nick);
        this.nombreUsuario = nick;
        this.edadUsuario = edad;
        this.http
          .put(`http://localhost:3000/actualizar/${this.nombreUsuario}/${this.edadUsuario}`, { nick, edad })
          .subscribe({
            next: (response) => {
              this.respuesta = response;
            },
            error: (err) => {
              alert(
                'There was an error in retrieving data from the server' +
                  err +
                  err.message
              );
            },
          });
      } catch (error) {
        this.respuesta = error;
      }
    }
  }
