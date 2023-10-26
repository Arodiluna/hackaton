import { Component } from '@angular/core';
import { RegistroService } from 'src/app/services/registro.service';

@Component({
  selector: 'app-inclusion',
  templateUrl: './inclusion.component.html',
  styleUrls: ['./inclusion.component.scss']
})
export class InclusionComponent {

  //Cursor.
  cursorState: boolean = false;

  
  //Dislexia.
  dislex: boolean = false;


  //Colores.
  invertedColors: boolean = false;

  //Grabar.
  grabar: boolean = false;

  constructor( private font: RegistroService ) { }
  //Función zoom.
  zoom() {
    this.font.increaseFontSize(1);
  }

 //Hacer grande el mouse.
 mouse() {
  this.cursorState = !this.cursorState; // Cambiar el estado del cursor
  if (this.cursorState) {
    document.body.classList.add('big-cursor'); // Agregar clase para cursor grande
  } else {
    document.body.classList.remove('big-cursor'); // Remover clase para cursor grande
  }
}

  //Dislexia.
  dislexia() {
    this.dislex = !this.dislex; // Cambiar el boton fuente.
    if (this.dislex) {
      document.body.classList.add('font'); // Agregar clase para colores invertidos
    } else {
      document.body.classList.remove('font'); // Remover clase para colores invertidos
    }
  }

  //Invertir colores.
  invertir() {
    this.invertedColors = !this.invertedColors; // Cambiar el estado de los colores invertidos
    if (this.invertedColors) {
      document.body.classList.add('invert-colors'); // Agregar clase para colores invertidos
    } else {
      document.body.classList.remove('invert-colors'); // Remover clase para colores invertidos
    }
  }

  recorder() {
    this.grabar = !this.grabar;
  }
}
