import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatosService } from 'src/app/services/datos.service';
import { catchError, throwError, timer } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginService } from 'src/app/services/login.service';


interface Usuario {
  id_usuario: number,
  nombre: string,
  apellido_p: string,
  apellido_m: string,
  usuario: string,
  discapacidad: string,
  email: string,
  fecha_creacion: string
}

@Component({
  selector: 'app-dashboard-alumnos',
  templateUrl: './dashboard-alumnos.component.html',
  styleUrls: ['./dashboard-alumnos.component.scss']
})
export class DashboardAlumnosComponent {


  //Public declarar info.
  public info: Usuario[] = [];

  //Name.
  name = localStorage.getItem('nombre');

  constructor( public datos: LoginService,
    public route: Router ) { }

    ngOnInit(): void {
      /*const contador = timer(2000);
      contador.subscribe((n) => {
        //this.usuario();
        this.usuarios();
      });*/
    }

    usuarios() {
      this.datos.usuario().pipe(
        //Mostrar alerta de error / eliminar local storage
        catchError((error: HttpErrorResponse) => {
          if (error.ok === false) {
            this.route.navigate(['login']);
          } 
          return throwError(() => error);
        })
      )
      .subscribe( resp => {
          //Carga igual a true.
  
          //Convertir en JSON.
          const respuesta = JSON.parse(JSON.stringify(resp));
    
          //console.log(respuesta.query);
          this.info = respuesta.query;  
          console.log(this.info);
      }) 
      
    }
}
