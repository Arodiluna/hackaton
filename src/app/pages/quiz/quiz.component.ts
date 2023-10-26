import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatosService } from 'src/app/services/datos.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent {

  loading: boolean = false;

  mensajes = {
    mensaje_uno: '',
    mensaje_dos: ''
  }

  complet: string = '';

  constructor ( private datos: DatosService,
    private route: Router ) { }

  async openai() {
    this.loading = true;
    this.complet = 'Crea un quiz con un título y ' + this.mensajes.mensaje_dos + ' preguntas sobre el tema ' + this.mensajes.mensaje_uno + ' de 4 opciones como respuesta y dame la respuesta correcta de cada una.';
    console.log(this.complet); 

    const valido = await this.datos.openai( this.complet );

    if ( valido ) {
      this.loading = false;
      console.log(localStorage.getItem('mensaje'));
      this.route.navigate(['maestro/sala']);
    } else {
      this.loading = false;
      console.log('error');
    }
  }

}
