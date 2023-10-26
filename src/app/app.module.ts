import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import {MatIconModule} from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegistroComponent } from './pages/registro/registro.component';
import { FooterComponent } from './pages/footer/footer.component';
import { HeaderComponent } from './pages/header/header.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { BienvenidaComponent } from './pages/bienvenida/bienvenida.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { QuizComponent } from './pages/quiz/quiz.component';
import { MaestroComponent } from './pages/maestro/maestro.component';
import { EstudianteComponent } from './pages/estudiante/estudiante.component';
import { HomeComponent } from './pages/home/home.component';
import { InclusionComponent } from './pages/inclusion/inclusion.component';
import { DashboardAlumnosComponent } from './pages/dashboard-alumnos/dashboard-alumnos.component';
import { QuizAlumnosComponent } from './pages/quiz-alumnos/quiz-alumnos.component';
import { SalaComponent } from './pages/sala/sala.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotfoundComponent,
    RegistroComponent,
    FooterComponent,
    HeaderComponent,
    InicioComponent,
    BienvenidaComponent,
    DashboardComponent,
    QuizComponent,
    MaestroComponent,
    EstudianteComponent,
    HomeComponent,
    InclusionComponent,
    DashboardAlumnosComponent,
    QuizAlumnosComponent,
    SalaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    HttpClientModule,
    FormsModule,
    MatButtonModule,
    MatTooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
