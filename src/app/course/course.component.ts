import { Component, OnInit } from '@angular/core';
import { CursoService } from '../curso.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { curso } from '../curso';

@Component({
  selector: 'app-course',
  standalone: false,
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  curso: curso[] = [];
  formGroupCurso: FormGroup;
  editando: any;
  
  // Array de disciplinas disponíveis e selecionadas
  todasDisciplinas: string[] = ['Matematica', 'Fisica', 'Programacao'];
  disciplinasSelecionadas: string[] = [];

  constructor(private service: CursoService, private formBuilder: FormBuilder) {
    this.formGroupCurso = formBuilder.group({
      id: [''],
      name: [''],
      turno: [''],
      disciplina: [''],
      semestre: [''],
      sigla: [''],
    });
  }

  ngOnInit(): void {
    this.loadCurso();
  }

  loadCurso() {
    this.service.getTodos().subscribe({
      next: json => this.curso = json
    });
  }

  // Método para atualizar as disciplinas selecionadas
  atualizarDisciplinas(disciplina: string, event: any) {
    if (event.target.checked) {
      this.disciplinasSelecionadas.push(disciplina);
    } else {
      this.disciplinasSelecionadas = this.disciplinasSelecionadas.filter(d => d !== disciplina);
    }
  }

  // Método de salvar 
  salvar() {
    const dadosFormulario = {
      ...this.formGroupCurso.value,
      disciplina: this.disciplinasSelecionadas
    };
  
    // Se estiver editando, faz o update
    if (this.editando) {
      this.service.atualizar(dadosFormulario).subscribe({
        next: () => {
          this.loadCurso();
          this.formGroupCurso.reset();
          this.disciplinasSelecionadas = [];
          this.editando = null;
        }
      });
    } else {
      // Senão, faz o cadastro novo
      this.service.salvar(dadosFormulario).subscribe({
        next: json => {
          this.curso.push(json);
          this.formGroupCurso.reset();
          this.disciplinasSelecionadas = [];
        }
      });
    }
  }
  

  remover(curso: curso) {
    this.service.delete(curso).subscribe({
      next: () => this.loadCurso()
    });
  }

  carregarParaEdicao(c: curso) {
    this.editando = c.id; // Armazena o ID que está sendo editado
    this.formGroupCurso.patchValue(c); // Preenche o formulário com os dados do curso
    this.disciplinasSelecionadas = Array.isArray(c.disciplina) ? c.disciplina : [c.disciplina]; // Atualiza os checkboxes
  }
}
