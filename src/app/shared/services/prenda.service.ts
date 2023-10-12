import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { FindOptions, IResponseOnePrenda, IResponsePrenda } from 'src/app/interfaces/shared/prenda.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PrendaService {

  private baseUrl = environment.API_URL + "/s2/api";

  constructor( private http: HttpClient ) { }

  getPrendasPaginate( page: number, limit: number, sort?: string, find?: FindOptions ): Observable<IResponsePrenda>{
    
    if( sort == undefined ) sort = "";

    const url = `${this.baseUrl}/prendas/p?page=${page}&limit=${limit}&sort=${sort}&categoria=${find?.categoria}&discount=${find?.discount}`;

    return this.http.get<IResponsePrenda>( url )
      .pipe(
        catchError( err => of(err) )
      )
  }

  getOne( ref: string ): Observable<IResponseOnePrenda>{
    const url = `${this.baseUrl}/prendas/ref/${ref}`;

    return this.http.get<IResponseOnePrenda>( url )
      .pipe(
        catchError( err => of(err) )
      )
  }
}
