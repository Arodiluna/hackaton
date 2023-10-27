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
    mensaje_uno: '',//Tema
    mensaje_dos: ''//El número de preguntas.
  }

  msg: string = '';
  complet: string = '';

  constructor ( private datos: DatosService,
    private route: Router ) { }

  async openai() {
    this.loading = true;
    this.complet = 'Creame un quiz que contenga un titulo sobre "' +  this.mensajes.mensaje_uno + ' en formato "# Mi Titulo", para las preguntas tendra el formato de "%Pregunta 1: Mi pregunta", para las respuestas tendra el formato "{Respuesta "X": Mi respuesta "X"" en todas las respuestas, luego separame el inciso correcto la cual tendra formato de: "!Inciso:"  Van a ser ' + this.mensajes.mensaje_dos + ' Preguntas con 4 Incisos'
    console.log(this.complet); 
    this.msg = 'Creame un quiz que contenga un titulo sobre' + this.mensajes.mensaje_uno + 'que sea de opción multiple con ' + this.mensajes.mensaje_dos + ' preguntas y 4 respuestas y con la respuesta correcta';

    const valido = await this.datos.openai( this.msg );

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
