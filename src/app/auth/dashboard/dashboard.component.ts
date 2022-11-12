import { Component, OnInit, ViewChild,NgZone} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClienteService } from 'src/app/services/cliente.service';
import { FirebaseErrorService } from 'src/app/services/firebase-error.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  dataUser:any;
  usuarios : any [] = [];
  
  constructor(private afAuth: AngularFireAuth,
    private router: Router,
    private usuarioService: ClienteService,
    private toastr : ToastrService,
    private ngZone: NgZone,
    private firebaseError: FirebaseErrorService
    ) { 
      
    }

  ngOnInit(): void{

    this.getUsuarios(); 
    this.afAuth.user.subscribe(user=>{
      if(user){
        this.ngZone.run(()=>{
          this.dataUser = user;
        })
      }else{
        this.router.navigate(['/Login']);
      }
    })
    /*NgZone nos ayuda a entrar en la zona de Angular. Esto es útil cuando utilizamos funcionalidad que nos ha sacado del contexto de ejecución de Angular y necesitamos volver al mismo. Por ejemplo: Cuando utilizamos algunas librerías que hacen llamados HTTP, por un tema de velocidad, estas se salen de la zona de Angular, luego, cuando se ejecuta su callback, necesitamos utilizar NgZone para volver a entrar a la zona de Angular para poder hacer algo desde nuestra aplicación de Angular en el callback.*/
  }

  logOut(){
    this.afAuth.signOut().then(()=> this.router.navigate(['/Login']));
  }

  //Recorre cada usuario registrado
  getUsuarios(){
    this.usuarioService.getUsuario().subscribe( data =>{
      this.usuarios = [];
      data.forEach((element: any) => {
        this.usuarios.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
    })
  }
  //Eiminar usuarios
  eliminarUsuarios(id:string) : void{
    const confirmacion = confirm('¿Estás seguro que deseas eliminar este Usuario?')
    if(confirmacion){
      this.usuarioService.eliminarUsuario(id).then(()=>{
        this.toastr.success('Usuario eliminado con éxito ', 'Eliminar Usuario');
        this.afAuth
      }).catch(error=>{
        this.toastr.error(this.firebaseError.codeError(error.code), 'Error');
      })
    }
    
  }
}

