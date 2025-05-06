import { Component, OnInit } from '@angular/core';
import { CursoService } from '../curso.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { curso } from '../../curso';

@Component({
  selector: 'app-course',
  standalone: false,
  templateUrl: './course.component.html',
  styleUrl: './course.component.css'
})
export class CourseComponent implements OnInit {
 
  curso: curso[] = [];
  formGroupCurso: FormGroup;
editando: any;

  constructor(private service: CursoService,
    private formBuilder: FormBuilder

  ) {
    this.formGroupCurso = formBuilder.group(
      {
        id: [''],
        name: [''],
        turno: [''],
        disciplina: this.formBuilder.array([]),
        semestre: [''],
        sigla: [''],

      }
    );

  }

  ngOnInit(): void {
    this.loadCurso();
  }
  loadCurso() {
    this.service.getTodos().subscribe({
      next: json => this.curso = json
    });
  }

  salvar() {
    this.service.salvar(this.formGroupCurso.value).subscribe
      (
        {
          next: json => 
          {this.curso.push(json);
          this.formGroupCurso.reset();
          }
        }
      )
  }


  remover(curso: curso) {
   this.service.delete(curso).subscribe({
    next: () => this.loadCurso()
   });
    }

    
   
}
