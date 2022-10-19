import { Injectable } from '@angular/core';
import { FirebaseErrorEnum } from '../utils/firebase-code-error';

@Injectable({
  providedIn: 'root'
})
export class FirebaseErrorService {

  constructor() { }

  codeError(code: String) {
    //Casos de errores
    switch (code) {
      //Correo Existente
      case FirebaseErrorEnum.EmailAlreadyInUse:
        return 'El ususario ya existe'

      //Contraseña Debil
      case FirebaseErrorEnum.WeakPassword:
        return 'Contraseña muy corta, mínimo 6 caracteres'

      //Contraseña Inválida
      case FirebaseErrorEnum.WrongPassword:
        return 'Contraseña Inválida'

      //Usuario Inválido
      case FirebaseErrorEnum.UserNotFound:
        return 'Usuario inválido no registrado aún'  

      //Correo Invalido
      case FirebaseErrorEnum.InternalError:
        return 'Correo inválido'

      //Cuenta Red Social Existente
      case FirebaseErrorEnum.CredentialAlreadyInUse:
        return 'Credencial de cuenta ya existe'  

      default:
        return 'Error desconcido'
    }
  }
}
