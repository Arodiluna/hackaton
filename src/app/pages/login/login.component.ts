import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { timer } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  usuario = {
    email: '',
    pass: ''
  }

  alerta = {
    informacion: '',
    error: '',
    correcto: ''
  }

  loading: boolean = false;


  //Llamar tokern session.
  token = localStorage.getItem('token');

  constructor ( private loginService: LoginService,
                private route: Router ) { }

  ngOnInit() {
     //Verificar token.
     if ( this.token == this.token ) {
      this.route.navigate(['home']);
     } else {
      this.route.navigate(['login']);
     }
  }

  //Email no permitir espacios.
  removeSpaces() {
    this.usuario.email = this.usuario.email.replace(/\s+/g, '').trim();
  }

  //Convertir en mínusculas
  convertToLower(): void {
    this.usuario.email = this.usuario.email.toLowerCase();
  }

  async login() {
    console.log(this.usuario);
    const contador = timer(5000);
    if ( this.usuario.pass == '' || this.usuario.email == '') {
      console.log('Campos vacíos');
      this.alerta.informacion = 'Hay campos vacíos';
      contador.subscribe((n) => {
        this.alerta.informacion= '';
      });
    } else {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if ( !emailRegex.test( this.usuario.email ) ) {
        this.alerta.error = 'Email no válido';
        console.log('Emila no valido');
        contador.subscribe((n) => {
          this.alerta.error = '';
        });
      } else {
        this.loading = true;
        const valido = await this.loginService.loginAdm( this.usuario.email, this.usuario.pass );

        if ( valido ) {
          this.loading = false;
          this.alerta.correcto = 'Inicio de sesión correcto';
          contador.subscribe((n) => {
            this.alerta.correcto = '';
          });
        } else {
          this.loading = false;
          this.alerta.error = 'Inicio de sesión incorrecto, volver a intentar';
          contador.subscribe((n) => {
            this.alerta.error = '';
          });
        }
      }
    }
  }

}
