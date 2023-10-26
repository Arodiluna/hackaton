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

  botones = {
    infantil: '',
    abstracto: '',
    realista: '',
    blanco_negro: '',
    futurista: ''
  }

  loading: boolean = false;

  mensaje: string = '';

  imagen: string = '';

  resultado_imagen: any = '';

  respuestaChat: string = '';

  mensajeCompleto: string = '';

  constructor ( private datos: DatosService,
    private route: Router ) { }
  
  async imagenai() {
    this.loading = true;
    
    this.mensajeCompleto = 'Quiero que me generes la imagen de ' + this.imagen +  ' con un estilo de arte ' + (this.botones.infantil || this.botones.abstracto || this.botones.futurista || this.botones.blanco_negro || this.botones.realista)
    console.log(this.mensajeCompleto)

    this.botones.infantil = '';
    this.botones.abstracto= '';
    this.botones.realista= '';
    this.botones.futurista= '';
    this.botones.blanco_negro= '';
  

    const valido = await this.datos.openaiaimagen( this.mensajeCompleto );

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
  
  uno(){
    this.botones.infantil = 'Infantil'
  }

  dos(){
    this.botones.abstracto = 'Abstracto'
  }

  tres(){
    this.botones.futurista = 'Futurista'
  }

  cuatro(){
    this.botones.blanco_negro = 'Blanco y Negro'
  }

  cinco(){
    this.botones.realista = 'Realista'
  }



}


