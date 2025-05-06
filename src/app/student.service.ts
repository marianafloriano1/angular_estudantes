import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Estudantes } from './estudante';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  //ponte com a api
  apiUrl = 'http://localhost:3000/estudantes';

  constructor(private http: HttpClient) { }

  //pega o estudante
  getALL(): Observable<Estudantes[]> {
    return this.http.get<Estudantes[]>(this.apiUrl);
  }

  //passa o estudante sem id e volta com id(devolve apenas um estudante)
  //salva o estudante
  save(estudante: Estudantes): Observable<Estudantes> {
    return this.http.post<Estudantes>(this.apiUrl, estudante);
  }

  //deletar estudante
  delete(estudante: Estudantes): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${estudante.id}`); //aqui deleta o estudante pelo id
  }

  //atualizar os dados do estudante
  update(estudante: Estudantes): Observable<Estudantes> {
    return this.http.put<Estudantes>(`${this.apiUrl}/${estudante.id}`, estudante); //muda o estudante pelo id dele 
  }


}

