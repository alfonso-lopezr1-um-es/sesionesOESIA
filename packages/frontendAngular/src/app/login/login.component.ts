import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  respuesta: any;

  constructor(private http: HttpClient) {}

  onSubmit(nick: string, password: string) {
    try {
      this.http
        .post('http://localhost:3000/login', { nick, password })
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
