import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RequestPayment } from '../interfaces/payment.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private baseUrl = environment.API_URL + "/s3/api";

  constructor( private http: HttpClient ) { }

  createPayment( buy: RequestPayment ){
    const url = `${this.baseUrl}/payment/create-order`;

    const headers = new HttpHeaders().set('token', localStorage.getItem('token') || "");

    return this.http.post( url, buy, { headers } )
      .pipe(
        catchError( err => of(err.error) )
      )
  }
}
