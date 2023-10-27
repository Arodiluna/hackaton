import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

//URL.
const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  constructor( private http: HttpClient, 
    private route: Router ) { }

    registro( nombre: string, apellido_p: string, apellido_m: string, usuario: string, discapacidad: string, email: string, pass: string ): Promise<boolean> {

      //Constante con el valor email y pass.
      const data = { nombre, apellido_p, apellido_m, usuario, discapacidad, email, pass };
  
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
  
        //console.log(resp);

        if ( jsonResp.ok ) {
          //console.log(jsonResp);

          //Enviar a home.
          this.route.navigate(['/login']);
          
          //Resolve true.
          resolve(true);
        } else {
          resolve(false);
        }
  
      }); 
    }); 
  }


  //Tamaño fuente.
  private fontSizeSubject = new BehaviorSubject<number>(14);
  fontSize$: Observable<number> = this.fontSizeSubject.asObservable();

  increaseFontSize(increment: number) {
    const currentSize = this.fontSizeSubject.getValue();
    let newSize = currentSize + increment;

    if (newSize > 20) {
     newSize = 14;
   }
    this.fontSizeSubject.next(newSize);
  }
}
