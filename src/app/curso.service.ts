import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { curso } from '../curso';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  apiUrl = 'http://localhost:3000/curso';

  constructor(private http: HttpClient) { }

    getTodos(): Observable<curso[]> {
      return this.http.get<curso[]>(this.apiUrl);
    }

      salvar(curso: curso): Observable<curso> {
        return this.http.post<curso>(this.apiUrl, curso);
      }
    

      delete(curso: curso): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${curso.id}`); 
      }
    
   
      
    

}
