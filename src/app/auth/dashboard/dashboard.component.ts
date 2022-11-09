import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
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
    private usuarioService: ClienteService
    ) { 
      
    }

  ngOnInit(): void {

    this.getUsuarios(); 
    this.afAuth.currentUser.then(user =>{
      if(user && user.emailVerified){
        this.dataUser = user;
        console.log(this.dataUser);
      }else if(user && user.email){
        this.dataUser = user;
        console.log(this.dataUser);
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
}

