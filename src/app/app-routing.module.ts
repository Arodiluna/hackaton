import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { tokenGuard } from './guards/token.guard';
import { HomeComponent } from './pages/home/home.component';
import { MaestroComponent } from './pages/maestro/maestro.component';
import { EstudianteComponent } from './pages/estudiante/estudiante.component';
import { QuizComponent } from './pages/quiz/quiz.component';
import { DashboardAlumnosComponent } from './pages/dashboard-alumnos/dashboard-alumnos.component';
import { QuizAlumnosComponent } from './pages/quiz-alumnos/quiz-alumnos.component';
import { InclusionComponent } from './pages/inclusion/inclusion.component';
import { SalaComponent } from './pages/sala/sala.component';
import { SalaAlumnoComponent } from './pages/sala-alumno/sala-alumno.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'registro',
    component: RegistroComponent
  },
  {
    path: 'inclusion',
    component: InclusionComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'inicio', pathMatch: 'full'},
      { path: 'inicio', component: InicioComponent},
      { path: '**', component: NotfoundComponent}
    ],
    canActivate: [ tokenGuard ]
  },
  {
    path: 'maestro',
    component: MaestroComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      { path: 'dashboard', component: DashboardComponent},
      { path: 'quiz', component: QuizComponent},
      { path: 'sala', component: SalaComponent},
      { path: '**', component: NotfoundComponent}
    ],
    canActivate: [ tokenGuard ]
  },
  {
    path: 'estudiante',
    component: EstudianteComponent,
    children: [
      { path: '', redirectTo: 'dashboard_estudiante', pathMatch: 'full'},
      { path: 'dashboard_estudiante', component: DashboardAlumnosComponent},
      { path: 'quiz_estudiante', component: QuizAlumnosComponent},
      { path: 'sala_estudiante', component: SalaAlumnoComponent},
      { path: '**', component: NotfoundComponent}
    ],
    canActivate: [ tokenGuard ]
  },
  {
    path: '**',
    component: NotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
