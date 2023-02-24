import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AmigosComponent } from './amigos/amigos.component';
import { HttpClientModule } from '@angular/common/http';
import { MayoresedadComponent } from './mayoresedad/mayoresedad.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { BorraramigoComponent } from './borraramigo/borraramigo.component';
import { ActualizaredadComponent } from './actualizaredad/actualizaredad.component';
import { CrearamigoComponent } from './crearamigo/crearamigo.component';
import { BuscaramigoComponent } from './buscaramigo/buscaramigo.component';

@NgModule({
  declarations: [AppComponent, AmigosComponent, MayoresedadComponent, WelcomeComponent, LoginComponent, BorraramigoComponent, ActualizaredadComponent, CrearamigoComponent, BuscaramigoComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
