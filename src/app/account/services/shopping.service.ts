import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from "rxjs/operators";
import { IResponse } from 'src/app/interfaces/global.interface';
import encryptAndDecrypt from 'src/app/utils/encryptAndDecrypt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  private bateUrl = environment.API_URL;

  constructor( private http: HttpClient ) { }

  public getAllShopping( page: number, limit: number ): Observable<IResponse>{
    const url = `${this.bateUrl}/compra/user?page=${page}&limit=${limit}`;

    const headers = new HttpHeaders().set( 'token', localStorage.getItem('token') || "" );

    return this.http.get<IResponse>( url, { headers } )
      .pipe(
        tap( res => {

          try {
            
            const decrypt = encryptAndDecrypt.decrypt( res.data as string );
            return res.data = decrypt;

          } catch (error) {
            return of("Algo va mal:" + error)
          }

        }),
        catchError( err => of(err.error) )
      )
  }

  public getOneShopping( compraId: string ): Observable<IResponse>{
    const url = `${this.bateUrl}/compra/one/${compraId}`;

    const headers = new HttpHeaders().set( 'token', localStorage.getItem('token') || "" );

    return this.http.get<IResponse>( url, { headers } )
      .pipe(
        tap( res => {

          try {
            const decrypt = encryptAndDecrypt.decrypt( res.data as string );
            return res.data = decrypt;

          } catch (error) {
            return of("Algo va mal:" + error);
          }

        }),
        catchError( err => of(err.error) )
      )
  }
}
