import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirebaseErrorService } from 'src/app/services/firebase-error.service';
import { GoogleAuthProvider,FacebookAuthProvider,GithubAuthProvider,TwitterAuthProvider} from '@angular/fire/auth';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUsuario: FormGroup;

  constructor(private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private router: Router,
    private firebaseError: FirebaseErrorService) {
    this.loginUsuario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      contraseña: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  ngOnInit(): void {
  }

  login() {
    const email = this.loginUsuario.value.email;
    const contraseña = this.loginUsuario.value.contraseña;

    this.afAuth.signInWithEmailAndPassword(email, contraseña).then((user) => {
      if (user.user?.emailVerified) {
        this.toastr.success(this.loginUsuario.value.email, 'Usuario Login Exitoso');
        this.router.navigate(['/Dashboard']);
      } else {
        this.toastr.warning(this.loginUsuario.value.email, 'Debes Verificar tu correo');
      }
    }).catch((error) => {
      this.toastr.error(this.firebaseError.codeError(error.code), 'Error');
    })
  }

  loginGoogle() {
    this.afAuth.signInWithPopup(new GoogleAuthProvider()).then(()=> this.router.navigate(['/Dashboard']));   
  }
  loginFacebook(){
    this.afAuth.signInWithPopup(new FacebookAuthProvider()).then(()=>{
      this.router.navigate(['/Dashboard']);
    }).catch((error)=>{
      this.toastr.error(this.firebaseError.codeError(error.code), 'Error');
    });
  }
  loginGithub(){
    this.afAuth.signInWithPopup(new GithubAuthProvider()).then(()=>{
      this.router.navigate(['/Dashboard']);
    }).catch((error)=>{
      this.toastr.error(this.firebaseError.codeError(error.code), 'Error');
    });
  }
  loginTwitter(){
    this.afAuth.signInWithPopup(new TwitterAuthProvider()).then(()=>{
      this.router.navigate(['/Dashboard']);
    }).catch((error)=>{
      this.toastr.error(this.firebaseError.codeError(error.code), 'Error');
    });
  }
}
