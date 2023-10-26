import { Component } from '@angular/core';

@Component({
  selector: 'app-sala',
  templateUrl: './sala.component.html',
  styleUrls: ['./sala.component.scss']
})
export class SalaComponent {


  mensaje = localStorage.getItem('mensaje');

  titulo: string = '';
  preguntas: string[] = [];
  respuestas: string[][] = [];
  respuestasCorrectas: string[] = [];

  ngOnInit() {
    //Verificar token.
    this.msg();
 }

  async msg() {
    const mensajeString = JSON.stringify(this.mensaje);
    //console.log(mensajeString);
    // Separar el texto en secciones
    const sections = mensajeString.split('\n');
    this.titulo = sections[0].trim().substring(8).trim();
    let pregunta = '';
    let opciones: string[] = [];
    let respuestaCorrecta = '';

    for (let i = 1; i < sections.length; i++) {
      const line = sections[i].trim();

      if (line.startsWith('Pregunta')) {
        // Nueva pregunta
        if (pregunta !== '') {
          this.preguntas.push(pregunta);
          this.respuestas.push(opciones);
          this.respuestasCorrectas.push(respuestaCorrecta);
        }

        pregunta = line.substring(line.indexOf(':') + 1).trim();
        opciones = [];
        respuestaCorrecta = '';
      } else if (line.startsWith('Respuesta correcta:')) {
        // Respuesta correcta
        respuestaCorrecta = line.substring(18).trim();
      } else if (line.match(/^[A-D]\)/)) {
        // Opción de respuesta
        opciones.push(line);
      }
    }

    // Agregar la última pregunta
    this.preguntas.push(pregunta);
    this.respuestas.push(opciones);
    this.respuestasCorrectas.push(respuestaCorrecta);

    console.log(this.titulo);
    console.log(this.preguntas);
  }
  
  

}
