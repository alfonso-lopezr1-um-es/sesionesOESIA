import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-crearamigo',
  templateUrl: './crearamigo.component.html',
  styleUrls: ['./crearamigo.component.css'],
})
export class CrearamigoComponent {
  respuesta: any;

  constructor(private http: HttpClient) {}
  // cuidado con el number
  onSubmit(
    nick: string,
    firstname: string,
    lastname: string,
    password: string,
    age: string
  ) {
    try {
      this.http
        .post('http://localhost:3000/crearamigo', {
          nick,
          firstname,
          lastname,
          password,
          age,
        })
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
