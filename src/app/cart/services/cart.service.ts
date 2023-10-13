import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AddCart, ResponseCart } from '../interfaces/cart.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private baseUrl = `${environment.API_URL}/s3/api`;

  constructor( private http: HttpClient ) { }

  getCart(): Observable<ResponseCart>{

    const url = `${this.baseUrl}/cart/one`;

    const headers = new HttpHeaders().set('token', localStorage.getItem('token') || "");

    return this.http.get<ResponseCart>( url, { headers } )
      .pipe(
        catchError( err => of(err.error) )
      )
  }

  addCart( cart: AddCart ): Observable<ResponseCart>{
    const url = `${this.baseUrl}/cart/add`;

    const headers = new HttpHeaders().set('token', localStorage.getItem('token') || "");

    return this.http.post<ResponseCart>( url, cart, { headers } )
      .pipe(
        catchError( err => of(err.error) )
      )
  }

}
