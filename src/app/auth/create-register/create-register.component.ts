import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth, USE_EMULATOR } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseErrorService } from 'src/app/services/firebase-error.service';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-create-register',
  templateUrl: './create-register.component.html',
  styleUrls: ['./create-register.component.css']
})
export class CreateRegisterComponent implements OnInit {
  registrarUsuario: FormGroup;
  //tipo string cuando lo editemos y null cuando lo creemos
  id: string | null;  

  constructor(private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private router: Router,
    private aRoute: ActivatedRoute,
    private usuarioService: ClienteService,
    private firebaseError: FirebaseErrorService) { 
      this.registrarUsuario = this.fb.group({
        apellido: ['', Validators.required],
        nombre: ['', Validators.required],
        email: ['', [Validators.required,Validators.email]],
        age:['', Validators.required],
        number:['', Validators.required],
        address:['',Validators.required],
        contraseña: ['', [
          Validators.required,
          Validators.minLength(7),
          Validators.pattern(/[a-z]/),
          Validators.pattern(/[0-9]/),
          Validators.pattern(/[!@#$]/),
        ]],
        contraseñarepe: ['',Validators.required],
      })
      //Acceder al id
      this.id = this.aRoute.snapshot.paramMap.get('id');
      console.log(this.id);
    }

    //Validators.pattern('^(?=.[A-Za-z])(?=.\d)(?=.[@$!%#?&])[A-Za-z\d@$!%*#?&].{7,}$')
  ngOnInit(): void {
    //Cuando se inicializa el componente
    this.afAuth.currentUser.then(user =>{
      if(user && user.emailVerified || user && user.email){
        this.esEditar();
      }else{
        this.router.navigate(['/Login']);
      }
    })
  }

  registrar() {
    const user =this.afAuth.credential;
    const email= this.registrarUsuario.value.email;
    const contraseña= this.registrarUsuario.value.contraseña;
    const contraseñarepe = this.registrarUsuario.value.contraseñarepe;

    //Validación misma contraseña 
    if(contraseña !== contraseñarepe){
      this.toastr.error('Las contraseñas no coinciden', 'Error Contraseñas');
      return;
    }
    if(user !== email){
      this.afAuth.createUserWithEmailAndPassword(email, contraseña).then(() => {
        //Codicional para Crear Usuario
        if(this.id === null){
          this.pushUsuario();
        }
      }).catch((error) => {
        this.toastr.error(this.firebaseError.codeError(error.code), 'Error');
      })
    }else{
      this.toastr.error('Credencial Existente', 'Error');
    }

    //Codicional para editar
    if(this.id !== null){
      this.editarUsuario(this.id);
    }
  }
  

  pushUsuario(){

    const crearUsuario: any = {
      nombre : this.registrarUsuario.value.nombre,
      apellido : this.registrarUsuario.value.apellido,
      email : this.registrarUsuario.value.email,
      age: this.registrarUsuario.value.age,
      number : this.registrarUsuario.value.number,
      address: this.registrarUsuario.value.address,
      contraseña : this.registrarUsuario.value.contraseña,
      contraseñarepe : this.registrarUsuario.value.contraseñarepe
    }
    //Para Crear el Usuario
    this.usuarioService.agregarUsuario(crearUsuario).then((user)=>{
  
      this.toastr.success('Registro del usuario con éxito!', 'Usuario Creado');
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
                            })
  }

  editarUsuario(id:string){
    const actualizarUsuario: any = {
      nombre : this.registrarUsuario.value.nombre,
      apellido : this.registrarUsuario.value.apellido,
      //email : this.registrarUsuario.value.email, el email no lo actualizo
      age: this.registrarUsuario.value.age,
      number : this.registrarUsuario.value.number,
      address: this.registrarUsuario.value.address,
      contraseña : this.registrarUsuario.value.contraseña,
      contraseñarepe : this.registrarUsuario.value.contraseñarepe
    }

    this.usuarioService.actualizarUsuario(id,actualizarUsuario).then(()=>{
      this.toastr.success('El Usuario fue Editado/Actualizado con éxito', 'Usuario Actualizado');
      this.router.navigate(['/Dashboard']);
    })
  }

  esEditar(){
    if(this.id !== null){
      this.usuarioService.getUsuarioEmail(this.id).subscribe(data =>{
        //Seteo todos los valores respecto a ese email a editar en los campos
        this.registrarUsuario.setValue({
          apellido : data.payload.data()['apellido'],
          nombre : data.payload.data()['nombre'],
          email : data.payload.data()['email'],
          age: data.payload.data()['age'],
          number : data.payload.data()['number'],
          address: data.payload.data()['address'],
          contraseña : data.payload.data()['contraseña'], 
          contraseñarepe : data.payload.data()['contraseñarepe'], 
        })
      })
    }
  }

  
}
