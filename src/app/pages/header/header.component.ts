import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {


  nombre = localStorage.getItem('nombre');

  constructor( private loginServie: LoginService) { }

  cerrar_sesion() {
    Swal.fire({
      title: 'Alerta',
      text: "¿Estás seguro que quieres cerrar sesión?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#FF0000',
      confirmButtonText: 'Cerrar sesión',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
         this.loginServie.cerrarSesion();
      } 
    })
  }
}
