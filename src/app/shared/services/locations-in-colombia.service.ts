import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { Iubicaciones } from 'src/app/interfaces/shared/locationsColombia.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationsInColombiaService {

  private baseUrl = environment.URL_DATOS_COLOMBIA;

  constructor( private http: HttpClient ) { }

  getLocation(): Observable<Iubicaciones[]>{
    return this.http.get<Iubicaciones[]>( this.baseUrl )
      .pipe(
        catchError( err => of(err) )
      )
  }

  getInfoDepartment( departamento: string ): Observable<Iubicaciones[]>{
    const url = `${this.baseUrl}?departamento=${departamento}`;

    return this.http.get<Iubicaciones[]>( url )
      .pipe(
        catchError( err => of(err) )
      )
  }
}
