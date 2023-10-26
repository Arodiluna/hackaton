import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { DatosService } from 'src/app/services/datos.service';

@Component({
  selector: 'app-imagen',
  templateUrl: './imagen.component.html',
  styleUrls: ['./imagen.component.scss']
})
export class ImagenComponent {

  loading: boolean = false;

  mensaje: string = '';

  imagen: string = '';

  resultado_imagen: any = '';

  respuestaChat: string = '';

  constructor ( private datos: DatosService,
    private route: Router ) { }
  
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


