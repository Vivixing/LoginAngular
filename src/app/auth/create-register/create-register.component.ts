import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FirebaseErrorService } from 'src/app/services/firebase-error.service';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-create-register',
  templateUrl: './create-register.component.html',
  styleUrls: ['./create-register.component.css']
})
export class CreateRegisterComponent implements OnInit {
  registrarUsuario: FormGroup;

  constructor(private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private router: Router,
    private usuarioService: ClienteService,
    private firebaseError: FirebaseErrorService) { 
      this.registrarUsuario = this.fb.group({
        apellido: ['', Validators.required],
        nombre: ['', Validators.required],
        email: ['', [Validators.required,Validators.email]],
        age:['', Validators.required],
        number:['', Validators.required],
        address:['',Validators.required],
        contraseña: ['', [Validators.required,Validators.minLength(7)]],
        contraseñarepe: ['', [Validators.required,Validators.minLength(7)]],
      })
    }

    //Validators.pattern('^(?=.[A-Za-z])(?=.\d)(?=.[@$!%#?&])[A-Za-z\d@$!%*#?&].{7,}$')
  ngOnInit(): void {
  }

  registrar() {

    const email= this.registrarUsuario.value.email;
    const contraseña= this.registrarUsuario.value.contraseña;

    const crearUsuario: any = {
      nombre : this.registrarUsuario.value.nombre,
      apellido : this.registrarUsuario.value.apellido,
      email : this.registrarUsuario.value.email,
      age: this.registrarUsuario.value.age,
      number : this.registrarUsuario.value.number,
      address: this.registrarUsuario.value.address,
      contraseña : this.registrarUsuario.value.contraseña,   

      
    }
    this.afAuth.createUserWithEmailAndPassword(email, contraseña).then((user) => {
      //Si se da como exitoso el registro entonces redirecciono al Login
      this.verificarEmail();
      //console.log(user);
    }).catch((error) => {
      //console.log(error);
      this.toastr.error(this.firebaseError.codeError(error.code), 'Error');
    })

    this.usuarioService.agregarUsuario(crearUsuario).then(()=>{
      this.toastr.info('Registro del ussuario con éxito!', 'Usuario Creado');
      this.router.navigate(['/Dashboard']);
      this.verificarEmail();
    }).catch(error =>{
      console.log(error);
      this.toastr.error(this.firebaseError.codeError(error.code), 'Error');
    })
  }

  verificarEmail(){
    this.afAuth.currentUser.then(user=>user?.sendEmailVerification())
                            .then(()=>{
                              this.toastr.info('Le enviamos un correo para su verifación', 'Verificar Correo');
                              this.router.navigate(['/Dashboard']);
                            })
  }

}
