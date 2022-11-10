import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private firestore: AngularFirestore) { }

  //agrega a la Basa de datos
  agregarUsuario(usuario:any): Promise<any> {
    return this.firestore.collection('usuarios').add(usuario);
  }

  //Consumir los datos
  getUsuario() : Observable<any> {
    return this.firestore.collection('usuarios').snapshotChanges();
  }

  //Eliminar Usuario  
  eliminarUsuario(id:string) : Promise<any> {
    return this.firestore.collection('usuarios').doc(id).delete();
  }

  //Consumir los datos por el id a editar
  getUsuarioEmail(id:string) : Observable<any>{
    return this.firestore.collection('usuarios').doc(id).snapshotChanges();
  }

  //Para editar el Usuario
  actualizarUsuario(id:string, data: any) : Promise<any> {
    return this.firestore.collection('usuarios').doc(id).update(data);
  }
}

