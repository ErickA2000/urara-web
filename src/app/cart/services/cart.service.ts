import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AddCart, ResponseCart, UpdateCart } from '../interfaces/cart.interface';

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

  updateProductCart( updateData: UpdateCart ): Observable<ResponseCart> {
    const url = `${this.baseUrl}/cart/update`;

    const headers = new HttpHeaders().set('token', localStorage.getItem('token') || "");

    return this.http.put<ResponseCart>( url, updateData, { headers } )
      .pipe(
        catchError( err => of(err.error) )
      )
  }

  deleteProdcutCart( index: number ): Observable<ResponseCart>{
    const url = `${this.baseUrl}/cart/delete_product/${index}`;

    const headers = new HttpHeaders().set('token', localStorage.getItem('token') || "");

    return this.http.delete<ResponseCart>( url, { headers } )
      .pipe(
        catchError( err => of(err.error) )
      )
  }

}
