import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-mayoresedad',
  templateUrl: './mayoresedad.component.html',
  styleUrls: ['./mayoresedad.component.css']
})

export class MayoresedadComponent {
  amigos: any[] = [];
  constructor(private http: HttpClient) { }
  ngOnInit() {
    console.log("ngOnInit");
    this.http.get<any[]>('http://localhost:3000/amigosmayores').subscribe(amigos => {
      this.amigos = amigos;
    });
  }
}
