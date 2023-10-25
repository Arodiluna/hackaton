import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class tokenGuard {
  
  constructor( private loginService: LoginService ) { }

  //No abrir estas rutas.
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.loginService.validarToken();
  }

}