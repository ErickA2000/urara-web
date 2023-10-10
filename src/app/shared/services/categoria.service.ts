import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { IResponseAllCategory } from 'src/app/interfaces/shared/categoria.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private baseUrl = environment.API_URL + "/s2/api";

  constructor( private http: HttpClient ) { }

  getCategorias(): Observable<IResponseAllCategory>{
    const url = `${this.baseUrl}/categorias`;

    return this.http.get<IResponseAllCategory>( url )
      .pipe(
        catchError( err => of(err) )
      )
  }

}
