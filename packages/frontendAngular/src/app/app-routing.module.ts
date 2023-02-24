import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AmigosComponent } from './amigos/amigos.component';
import { MayoresedadComponent } from './mayoresedad/mayoresedad.component';
import { LoginComponent } from './login/login.component';
import { BorraramigoComponent } from './borraramigo/borraramigo.component';
import { ActualizaredadComponent } from './actualizaredad/actualizaredad.component';
import { CrearamigoComponent } from './crearamigo/crearamigo.component';
import { BuscaramigoComponent } from './buscaramigo/buscaramigo.component';

const routes: Routes = [
  { path: 'amigos', component: AmigosComponent },
  { path: 'mayoresedad', component: MayoresedadComponent },
  { path: 'login' , component: LoginComponent},
  { path: 'borrar', component: BorraramigoComponent},
  { path: 'actualizaredad', component: ActualizaredadComponent},
  { path: 'crearamigo', component: CrearamigoComponent},
  { path: 'buscar', component: BuscaramigoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
