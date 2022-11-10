import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateRegisterComponent } from './auth/create-register/create-register.component';
import { DashboardComponent } from './auth/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { RecordarPasswordComponent } from './auth/recordar-password/recordar-password.component';
import { RegisterComponent } from './auth/register/register.component';

//Creo la ruta
const routes: Routes = [
  {path: '',redirectTo: 'Login', pathMatch:'full'},
  {path: 'Login', component: LoginComponent},
  {path: 'Register', component: RegisterComponent},
  {path: 'RecuperarContraseña', component: RecordarPasswordComponent},
  {path: 'Dashboard', component: DashboardComponent},
  {path: 'CreateRegister', component:CreateRegisterComponent},
  {path: 'EditRegister/:id', component:CreateRegisterComponent},//"/:email" y se reutiliza el componente crear
  {path:  '**', redirectTo: 'Login', pathMatch:'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
