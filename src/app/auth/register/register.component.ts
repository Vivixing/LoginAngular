import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FirebaseErrorService } from 'src/app/services/firebase-error.service';
import { GoogleAuthProvider, FacebookAuthProvider, GithubAuthProvider, TwitterAuthProvider } from '@angular/fire/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  //Creo la variable
  registrarUsuario: FormGroup;

  //Inicializo el registrarUsuario
  //FormBuilder ayuda a construir el formulario
  constructor(private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private router: Router,
    private firebaseError: FirebaseErrorService) {
    this.registrarUsuario = this.fb.group({
      apellido: ['', Validators.required],
      nombre: ['', Validators.required],
      email: ['', [Validators.required,Validators.email]],
      contraseña: ['', [Validators.required,Validators.minLength(6)]],
    })
  }

  ngOnInit(): void {
  }

  //Metodos
  registrar() {
    const email = this.registrarUsuario.value.email;
    const contraseña = this.registrarUsuario.value.contraseña;


    this.afAuth.createUserWithEmailAndPassword(email, contraseña).then((user) => {
      //Si se da como exitoso el registro entonces redirecciono al Login
      this.verificarEmail();
      //console.log(user);
    }).catch((error) => {
      //console.log(error);
      this.toastr.error(this.firebaseError.codeError(error.code), 'Error');
    })
  }

  verificarEmail(){
    this.afAuth.currentUser.then(user=>user?.sendEmailVerification())
                            .then(()=>{
                              this.toastr.info('Le enviamos un correo para su verifación', 'Verificar Correo');
                              this.router.navigate(['/Login']);
                            })
  }
  

  registroGoogle(){
    this.afAuth.signInWithPopup(new GoogleAuthProvider()).then(()=> {this.router.navigate(['/Dashboard'])});
  }
  registroFacebook(){
    this.afAuth.signInWithPopup(new FacebookAuthProvider()).then(()=> this.router.navigate(['/Dashboard'])).catch((error)=>{
      this.toastr.error(this.firebaseError.codeError(error.code), 'Error');
    });
  }
  registroGithub(){
    this.afAuth.signInWithPopup(new GithubAuthProvider()).then(()=> this.router.navigate(['/Dashboard'])).catch((error)=>{
      this.toastr.error(this.firebaseError.codeError(error.code), 'Error')});
  }
  registroTwitter(){
    this.afAuth.signInWithPopup(new TwitterAuthProvider()).then(()=> this.router.navigate(['/Dashboard'])).catch((error)=>{
      this.toastr.error(this.firebaseError.codeError(error.code), 'Error')});
  }
}
