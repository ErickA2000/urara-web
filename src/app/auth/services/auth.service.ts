import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from "rxjs/operators";
import { IResponseLogin, Icredenciales, IcredencialesEncrypt } from 'src/app/interfaces/auth/auth.interface';
import { IdataUser } from 'src/app/interfaces/auth/user.interface';
import alertSwal from 'src/app/utils/alertSwal';
import encryptAndDecrypt from 'src/app/utils/encryptAndDecrypt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.API_URL;
  private _user!: IdataUser;

  get user(){
    return { ...this._user }
  }

  constructor( private http: HttpClient ) { }

  login( credenciales: Icredenciales ): Observable<IResponseLogin> {
    const url = `${ this.baseUrl }/auth/login`;

    //Encrypt credentials
    let credentialsEncrypt!: IcredencialesEncrypt;
    try {
      const encrypt = encryptAndDecrypt.encrypt( credenciales );
      credentialsEncrypt.reqEncrypt = encrypt;
    } catch (error) {
      alertSwal.messageError( "Error encrypt:" + error );
    }

    return this.http.post<IResponseLogin>( url, credentialsEncrypt, { observe: 'response' } )
      .pipe( 
        tap( res => {
          
          if( res.body?.success ){

            localStorage.setItem( 'token', res.headers.get('token') || "" );

            try {
              if( res.body.data ){
                const dataUser = encryptAndDecrypt.decrypt( res.body.data ) as IdataUser;

                this._user = dataUser
              }
            } catch (error) {
              alertSwal.messageError( "Error decrypt" + error );
            }

          }

        }),
        map( res => res.body! ),
        catchError( err => of(err.error) )
      )
      
  }
}
