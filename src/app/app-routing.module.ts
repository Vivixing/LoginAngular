import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './auth/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { RecordarPasswordComponent } from './auth/recordar-password/recordar-password.component';
import { RegisterComponent } from './auth/register/register.component';

//Creo la ruta
const routes: Routes = [
  { path: '',component:LoginComponent},
  {path: 'Login', component: LoginComponent},
  {path: 'Register', component: RegisterComponent},
  {path: 'RecuperarContraseña', component: RecordarPasswordComponent},
  {path: 'Dashboard', component: DashboardComponent},
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
