import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-borraramigo',
  templateUrl: './borraramigo.component.html',
  styleUrls: ['./borraramigo.component.css'],
})
export class BorraramigoComponent {
  nombreUsuario: string = '';
  respuesta: any;

  constructor(private http: HttpClient) {}

  onSubmit(nick: string) {
    try {
      this.nombreUsuario = nick;
      this.http
        .delete(`http://localhost:3000/borrar/${this.nombreUsuario}`)
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
