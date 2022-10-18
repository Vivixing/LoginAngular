import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirebaseErrorService } from 'src/app/services/firebase-error.service';

@Component({
  selector: 'app-recordar-password',
  templateUrl: './recordar-password.component.html',
  styleUrls: ['./recordar-password.component.css']
})
export class RecordarPasswordComponent implements OnInit {
  recuperarUsuario:FormGroup;

  constructor(private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private router: Router,
    private firebaseError: FirebaseErrorService) {
      this.recuperarUsuario = this.fb.group({
        email:['',[Validators.required, Validators.email]]
      })
     }

  ngOnInit(): void {
  }

  recuperar(){
    const email = this.recuperarUsuario.value.email;

    this.afAuth.sendPasswordResetEmail(email).then(()=>{
      this.toastr.info( this.recuperarUsuario.value.email,'Recuperación de la contraseña al correo digitado');
      this.router.navigate(['/Login'])
       
    }).catch((error)=>{
      this.toastr.error(this.firebaseError.codeError(error.code), 'Error');
    })
  }

}
