import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  dataUser:any;
  displayedColumns: string[] = ['position', 'name', 'email','age'];
  dataSource = ELEMENT_DATA
  
  constructor(private afAuth: AngularFireAuth,
    private router: Router,
    ) { 
      
    }

  ngOnInit(): void {
    this.afAuth.currentUser.then(user =>{
      if(user && user.emailVerified){
        this.dataUser = user;
        console.log(this.dataUser);
      }else if(user && user.email){
        this.dataUser = user;
        console.log(this.dataUser);
      }else if(user && user.photoURL){
        this.dataUser = user;
        console.log(this.dataUser);
      }else{
        this.router.navigate(['/Login']);
      }
    })
  }

  logOut(){
    this.afAuth.signOut().then(()=> this.router.navigate(['/Login']));
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  age: number;
  email: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', email: 'H', age: 1.0079},
  {position: 2, name: 'Helium',  email: 'He', age: 1.0079},
  {position: 3, name: 'Lithium', email: 'Li', age: 1.0079},
];