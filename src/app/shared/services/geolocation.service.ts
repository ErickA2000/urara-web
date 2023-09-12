import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IgeoLocation } from 'src/app/interfaces/shared/geolocation.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  private IPINFO = environment.IPINFO;

  constructor( private http: HttpClient ) { }

  getLocation(): Observable<IgeoLocation>{
    const url = `${this.IPINFO.URL}/json?token=${this.IPINFO.TOKEN}`;

    return this.http.get<IgeoLocation>( url )
      .pipe( 
        catchError( err => of(err) )
      )
  }

}
