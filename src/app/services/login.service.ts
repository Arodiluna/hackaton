import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

//URL.
const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor( private http: HttpClient, 
    private route: Router ) { }

    login( email: string, pass: string ): Promise<boolean> {

      //Constante con el valor email y pass.
      const data = { email, pass };
  
      //Crear promesa.
      return new Promise<boolean>( resolve => {
        //Suscribe al login.
      this.http.post(`${ URL }/api/auth/login`, data)
      .pipe(
        //Mostrar alerta de error / eliminar local storage
        catchError((error: HttpErrorResponse) => {
          if (error.ok === false) {
            //Dejar de funcionar loader.
            localStorage.removeItem('token');
            resolve(false);
          } 
          return throwError(() => error);
        })
      )
      .subscribe( resp => {
        const jsonResp = JSON.parse(JSON.stringify(resp));
  
        console.log(resp);

        if ( jsonResp.ok ) {
          console.log(jsonResp);
          //Guardar token.
          localStorage.setItem('token', jsonResp.token);
        
          //Guardar roles y dar valores string.
          if ( jsonResp.discapacidad == '1' ) {
            //jsonResp.rol = 'admin';
            localStorage.setItem('rol', 'lKjhw8h2$22lajJALmuenakkd9278LjASDLEWNNWI%&ddh&');
          } else if (jsonResp.discapacidad == '2') {
            //jsonResp.rol = 'manager';
            localStorage.setItem('rol', '#2jsfkslll99lladskMngi81#sdkfsiikKJOIWOIE9983$jaoid');
          } 
          //Enviar a home.
          this.route.navigate(['/home']);
          
          //Resolve true.
          resolve(true);
        } else {
          localStorage.removeItem('token');
          resolve(false);
        }
  
      }); 
    }); 
  }

  //Renovar token.
validarToken (): Promise<boolean> {

  return new Promise<boolean> ( resolve => {
    const headers = new HttpHeaders({
      'x-token': localStorage.getItem('token') || ''
    });
    this.http.get(`${ URL }/api/auth/token`, { headers })
    .pipe(
      //Mostrar alerta de error / eliminar local storage
      catchError((error: HttpErrorResponse) => {
        if (error.ok === false) {
          this.route.navigate(['login']);
          localStorage.removeItem('token');
          resolve(false);
        } 
        return throwError(() => error);
      })
    )
    .subscribe( resp => {
      //Convertir en JSON.
      const respuesta = JSON.parse(JSON.stringify(resp));
      if (respuesta.ok) {
        //Mostrar info usuario.
        const usuario = respuesta;
        localStorage.setItem('token', usuario.token);
        //console.log(usuario.id_usuario);
        resolve(true);
      } else {
        resolve(false);
        localStorage.removeItem('token');
      }
    })
  });
}
}
