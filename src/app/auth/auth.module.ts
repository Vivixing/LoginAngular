import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AuthRoutingModule } from './auth-routing.module';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RecordarPasswordComponent } from './recordar-password/recordar-password.component';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTableModule} from '@angular/material/table';
import { ToastrModule } from 'ngx-toastr';//Animación Error y demás
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateRegisterComponent } from './create-register/create-register.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    RecordarPasswordComponent,
    DashboardComponent,
    CreateRegisterComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatTabsModule,
    MatIconModule,
    MatTableModule,
    ReactiveFormsModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    ToastrModule.forRoot(),
  ],
  exports: [
    LoginComponent,
    RecordarPasswordComponent,
    RegisterComponent,
    DashboardComponent,
  ]
  
})
export class AuthModule { }
