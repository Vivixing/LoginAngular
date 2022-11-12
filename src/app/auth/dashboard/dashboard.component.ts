import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClienteService } from 'src/app/services/cliente.service';


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
    private toastr : ToastrService
    ) { 
      
    }

  ngOnInit(): void {

    this.getUsuarios(); 
    this.afAuth.currentUser.then(user =>{
      if(user && user.emailVerified){
        this.dataUser = user;
      }else if(user && user.email){
        this.dataUser = user;
      }/*else if(user && user.photoURL){
        this.dataUser = user;
        console.log(this.dataUser);
      }*/else{
        this.router.navigate(['/Login']);
      }
    })
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
      console.log(this.usuarios);
    })
  }

  //Eiminar usuarios
  eliminarUsuarios(id:string) : void{
    const confirmacion = confirm('Estás seguro que deseas eliminar este Usuario:')
    if(confirmacion){
      this.usuarioService.eliminarUsuario(id).then(()=>{
        this.toastr.success('Usuario eliminado con éxito ', 'Eliminar Usuario');
        this.afAuth
      }).catch(error=>{
        console.log(error);
      })
    }
    
  }
}

