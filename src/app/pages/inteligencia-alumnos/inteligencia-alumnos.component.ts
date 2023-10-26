import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatosService } from 'src/app/services/datos.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-inteligencia-alumnos',
  templateUrl: './inteligencia-alumnos.component.html',
  styleUrls: ['./inteligencia-alumnos.component.scss']
})
export class InteligenciaAlumnosComponent {
  loading: boolean = false;

  mensaje: string = '';

  imagen: string = '';

  resultado_imagen: any = '';

  respuestaChat: string = '';

  constructor ( private datos: DatosService,
    private route: Router ) { }

  async openai() {
    this.loading = true;

    const valido = await this.datos.openaialumno( this.mensaje );

    if ( valido ) {
      const contador = timer(2000);
      this.loading = false;
      console.log(localStorage.getItem('mensaje-alumno'));
      const mensajeString = JSON.stringify(localStorage.getItem('mensaje-alumno'));
      contador.subscribe((n) => {
        this.respuestaChat = mensajeString;
      });

    } else {
      this.loading = false;
      console.log('error');
    }
  }

  async imagenai() {
    this.loading = true;

    const valido = await this.datos.openaiaimagen( this.imagen );

    if ( valido ) {
      const contador = timer(2000);
      this.loading = false;
      console.log(localStorage.getItem('url'));
      const mensajeString = localStorage.getItem('url');
      contador.subscribe((n) => {
        this.resultado_imagen = mensajeString;
      });

    } else {
      this.loading = false;
      console.log('error');
    }
  }
}
