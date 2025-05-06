import { Component, OnInit } from '@angular/core';
import { Estudantes } from '../estudante';
import { StudentService } from '../student.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-estudantes',
  standalone: false,
  templateUrl: './estudantes.component.html',
  styleUrl: './estudantes.component.css'
})
export class EstudantesComponent implements OnInit {



  Estudantes: Estudantes[] = [];
  formGroupEstudantes: FormGroup;

  constructor(private service: StudentService,
    private formBuilder: FormBuilder

  ) {
    this.formGroupEstudantes = formBuilder.group(
      {
        id: [''],
        name: [''],
        course: [''],
      }
    );

  }

  ngOnInit(): void {
    this.loadEstudantes();
  }

  loadEstudantes(){
    this.service.getALL().subscribe({
      next: json => this.Estudantes = json
    });
  }

  save() {
    this.service.save(this.formGroupEstudantes.value).subscribe
      (
        {
          next: json => 
          {this.Estudantes.push(json);
          this.formGroupEstudantes.reset();
          }
        }
      )
  }

  remover(estudante: Estudantes) {
   this.service.delete(estudante).subscribe({
    next: () => this.loadEstudantes()
   });
    }

   
      
}
