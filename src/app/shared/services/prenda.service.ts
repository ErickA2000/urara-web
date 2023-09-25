import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { IResponsePrenda } from 'src/app/interfaces/shared/prenda.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PrendaService {

  private baseUrl = environment.API_URL;

  constructor( private http: HttpClient ) { }

  getPrendasPaginate( page: number, limit: number, sort?: string ): Observable<IResponsePrenda>{
    
    if( sort == undefined ) sort = "";

    const url = `${this.baseUrl}/prendas/p?page=${page}&limit=${limit}&sort=${sort}`;

    return this.http.get<IResponsePrenda>( url )
      .pipe(
        catchError( err => of(err) )
      )
  }
}
