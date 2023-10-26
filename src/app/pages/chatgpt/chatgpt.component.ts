import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { DatosService } from 'src/app/services/datos.service';

@Component({
  selector: 'app-chatgpt',
  templateUrl: './chatgpt.component.html',
  styleUrls: ['./chatgpt.component.scss']
})
export class ChatgptComponent {

  //Arreglo botones.
  botones = {
    infantil: '',
    ingles: '',
    divertido: '',
    mexicano: ''
  }

  selected: boolean = false;

  loading: boolean = false;

  mensaje: string = '';

  respuestaChat: string = '';

  mensajeCompleto: string = '';

  constructor ( private datos: DatosService,
    private route: Router ) { }

  async openai() {
    this.loading = true;

    this.mensajeCompleto = 'Explicame como si fuera niño con ejemplos de caricaturas o dibujos animados el siguiente tema ' + this.mensaje

      const valido = await this.datos.openaialumno( this.mensajeCompleto );


    if ( valido ) {
      const contador = timer(2000);
      this.loading = false;
      console.log(localStorage.getItem('mensaje-alumno'));
      const mensajeString = JSON.stringify(localStorage.getItem('mensaje-alumno'));
      contador.subscribe((n) => {
        this.respuestaChat = mensajeString + ' Espero haberte ayudado, :] ¿deseas hacer otras pregunta?';
      });

      this.mensaje = '';

    } else {
      this.loading = false;
      console.log('error');
    }
  }


  uno() {
    this.selected = !this.selected;
    this.botones.infantil = 'que entiendan los niños';
  }

  dos() {
    this.selected = !this.selected;
    this.botones.ingles = 'en ingles';
  }

  tres() {
    this.selected = !this.selected;
    this.botones.divertido = 'divertido';
  }

  cuatro() {
    this.selected = !this.selected;
    this.botones.mexicano = 'mexicano';
  }

}
