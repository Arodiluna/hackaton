import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { catchError, throwError } from 'rxjs';

//URL.
const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class DatosService {

  constructor( private http: HttpClient, 
    private route: Router ) { }

    openai( mensaje: string ): Promise<boolean> {

      //Constante con el valor email y pass.
      const data = { mensaje };
  
      //Crear promesa.
      return new Promise<boolean>( resolve => {
        const headers = new HttpHeaders({
          'x-token': localStorage.getItem('token') || ''
        });
        //Suscribe al login.
      this.http.post(`${ URL }/api/auth/mensaje`, data, { headers })
      .pipe(
        //Mostrar alerta de error / eliminar local storage
        catchError((error: HttpErrorResponse) => {
          if (error.ok === false) {
            //Dejar de funcionar loader.
            resolve(false);
          } 
          return throwError(() => error);
        })
      )
      .subscribe( resp => {
        const jsonResp = JSON.parse(JSON.stringify(resp));

        if ( jsonResp.ok ) {
          //Guardar mensaje.
          localStorage.setItem('mensaje', jsonResp.mensaje);

          //Resolve true.
          resolve(true);
        } else {
          resolve(false);
        }
  
      }); 
    }); 
  }

  openaialumno( mensaje: string ): Promise<boolean> {

    //Constante con el valor email y pass.
    const data = { mensaje };

    //Crear promesa.
    return new Promise<boolean>( resolve => {
      const headers = new HttpHeaders({
        'x-token': localStorage.getItem('token') || ''
      });
      //Suscribe al login.
    this.http.post(`${ URL }/api/auth/mensaje`, data, { headers })
    .pipe(
      //Mostrar alerta de error / eliminar local storage
      catchError((error: HttpErrorResponse) => {
        if (error.ok === false) {
          //Dejar de funcionar loader.
          resolve(false);
        } 
        return throwError(() => error);
      })
    )
    .subscribe( resp => {
      const jsonResp = JSON.parse(JSON.stringify(resp));

      if ( jsonResp.ok ) {
        //Guardar mensaje.
        localStorage.setItem('mensaje-alumno', jsonResp.mensaje);

        //Resolve true.
        resolve(true);
      } else {
        resolve(false);
      }

    }); 
  }); 
}

  openaiaimagen( mensaje: string ): Promise<boolean> {

    //Constante con el valor email y pass.
    const data = { mensaje };

    //Crear promesa.
    return new Promise<boolean>( resolve => {
      const headers = new HttpHeaders({
        'x-token': localStorage.getItem('token') || ''
      });
      //Suscribe al login.
    this.http.post(`${ URL }/api/auth/gpt/image`, data, { headers })
    .pipe(
      //Mostrar alerta de error / eliminar local storage
      catchError((error: HttpErrorResponse) => {
        if (error.ok === false) {
          //Dejar de funcionar loader.
          resolve(false);
        } 
        return throwError(() => error);
      })
    )
    .subscribe( resp => {
      const jsonResp = JSON.parse(JSON.stringify(resp));
      if ( jsonResp.ok ) {
        //Guardar mensaje.
        localStorage.setItem('url', jsonResp.url[0].url);

        //Resolve true.
        resolve(true);
      } else {
        resolve(false);
      }

    }); 
  }); 
}


}
