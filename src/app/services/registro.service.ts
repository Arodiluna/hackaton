import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

//URL.
const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  constructor( private http: HttpClient, 
    private route: Router ) { }

    registro( nombre: string, apellido_p: string, apellido_m: string, usuario: string, discapacidad: string, fecha_nacimiento: string, email: string, pass: string ): Promise<boolean> {

      //Constante con el valor email y pass.
      const data = { nombre, apellido_p, apellido_m, usuario, discapacidad, fecha_nacimiento, email, pass };
  
      //Crear promesa.
      return new Promise<boolean>( resolve => {
        //Suscribe al login.
      this.http.post(`${ URL }/api/auth/registro`, data)
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

          //Enviar a home.
          this.route.navigate(['/bienvenida']);
          
          //Resolve true.
          resolve(true);
        } else {
          resolve(false);
        }
  
      }); 
    }); 
  }

}
