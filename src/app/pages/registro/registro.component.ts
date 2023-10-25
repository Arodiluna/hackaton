import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegistroService } from 'src/app/services/registro.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {

  usuario = {
    nombre: '',
    apellido_p: '',
    apellido_m: '',
    usuario: '',
    discapacidad: '2',
    email: '',
    pass: ''
  }

  alerta = {
    informacion: '',
    error: '',
    correcto: ''
  }
  
  isLoading: boolean = false;

  constructor ( private registroService: RegistroService,
    private route: Router ) { }


    ngOnInit() {
      //Verificar token.is.route.navigate(['login']);
      }

    back() {
          //Enviar a home.
          this.route.navigate(['/login']);
    }

    //Email no permitir espacios.
    removeSpaces() {
      this.usuario.email = this.usuario.email.replace(/\s+/g, '').trim();
      this.usuario.usuario = this.usuario.usuario.replace(/\s+/g, '').trim();
    }
  
    //Convertir en mínusculas
    convertToLower(): void {
      this.usuario.email = this.usuario.email.toLowerCase();
      this.usuario.usuario = this.usuario.usuario.toLowerCase();
    }

     async registro() {
      const contador = timer(5000);
      if ( this.usuario.nombre == '' || this.usuario.apellido_p == '' || this.usuario.apellido_m == '' || this.usuario.usuario == '' || this.usuario.discapacidad == '', this.usuario.pass == '') {

        this.isLoading = false;
        this.alerta.informacion = 'Hay campos vacíos';
        contador.subscribe((n) => {
          this.alerta.informacion = '';
        });
      } else {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if ( !emailRegex.test( this.usuario.email ) ) {
          this.alerta.error = 'Email no válido';
          this.isLoading = false;
          contador.subscribe((n) => {
            this.alerta.error = '';
          });
        } else {
          this.isLoading = true;
          const valido = await this.registroService.registro( this.usuario.nombre, this.usuario.apellido_p, this.usuario.apellido_m, this.usuario.usuario, this.usuario.discapacidad, this.usuario.email, this.usuario.pass );
  
          if ( valido ) {
            this.isLoading = false;
            //Convertimo el registro dos en verdadero.
            this.alerta.correcto = 'Los datos se insertaron correctamente';
            contador.subscribe((n) => {
              this.alerta.correcto = '';
            });
  
          } else {
            this.isLoading = false;
            this.alerta.error = 'Ya existe un usuario con ese email';
            contador.subscribe((n) => {
              this.alerta.error = '';
            });
          }
          //Cambiamos registro uno a false.
  
        }
      }
     }
     
     
   }

