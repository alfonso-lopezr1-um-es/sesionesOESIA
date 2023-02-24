import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-amigos',
  templateUrl: './amigos.component.html',
  styleUrls: ['./amigos.component.css']
})
export class AmigosComponent {
  amigos: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    console.log("ngOnInit");
    this.http.get<any[]>('http://localhost:3000/amigos').subscribe(amigos => {
      this.amigos = amigos;
    });
  }
}
