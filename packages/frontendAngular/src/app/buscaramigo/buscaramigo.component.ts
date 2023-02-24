import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-buscaramigo',
  templateUrl: './buscaramigo.component.html',
  styleUrls: ['./buscaramigo.component.css'],
})
export class BuscaramigoComponent {
  nombreUsuario: string = '';
  amigos: any[] = [];
  constructor(private http: HttpClient) {}
  onSubmit(nick: string) {
    this.nombreUsuario = nick;
    this.http
      .get<any[]>(`http://localhost:3000/amigos/${this.nombreUsuario}`)
      .subscribe((amigos) => {
        this.amigos = amigos;
      });
  }
}
