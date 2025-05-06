import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstudantesComponent } from './estudantes/estudantes.component';
import { CourseComponent } from './course/course.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: "estudantes", component: EstudantesComponent },
  { path: "course", component: CourseComponent },
  { path: "", component: HomeComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
