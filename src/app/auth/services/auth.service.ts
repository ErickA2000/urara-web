import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from "rxjs/operators";
import { IDataRegister, IResponseLogin, Icredenciales, IcredencialesEncrypt } from 'src/app/interfaces/auth/auth.interface';
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
  public token?: string;

  @Output() inLogin: EventEmitter<boolean> = new EventEmitter();

  get user(){
    return { ...this._user }
  }

  constructor( private http: HttpClient ) { }

  register( dataRegister: IDataRegister ): Observable<IResponseLogin>{
    const url = `${this.baseUrl}/auth/registro`;

    try {
      const encrypt = encryptAndDecrypt.encrypt( dataRegister );
      const dataRegisterEncrypt: IcredencialesEncrypt = {
        reqEncrypt: encrypt
      };

      return this.http.post<IResponseLogin>( url, dataRegisterEncrypt )
        .pipe(
          catchError( err => of(err.error) )
        )

    } catch (error: any) {
      alertSwal.messageError( "Error encrypt: " + error );
      return of(error);
    }
  }

  login( credenciales: Icredenciales ): Observable<IResponseLogin> {
    const url = `${ this.baseUrl }/auth/login`;

    //Encrypt credentials
    let credentialsEncrypt!: IcredencialesEncrypt;
    try {
      const encrypt = encryptAndDecrypt.encrypt( credenciales );
      credentialsEncrypt = {
        reqEncrypt: encrypt
      };

    } catch (error) {
      alertSwal.messageError( "Error encrypt:" + error );
    }

    return this.http.post<IResponseLogin>( url, credentialsEncrypt, { observe: 'response' } )
      .pipe( 
        tap( res => {
          
          if( res.body?.success ){

            if( res.body.message === "verification_in_process" ){
              this.token = res.headers.get('token') || undefined;
            }else{
              localStorage.setItem( 'token', res.headers.get('token') || "" );
            }


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

  verify2fa( username: string, code: { code: string } ): Observable<IResponseLogin>{
    const url = `${this.baseUrl}/auth/verify/${username}`;

    return this.http.post<IResponseLogin>( url, code, { observe: 'response' } )
      .pipe(
        tap(
          res => {

            if( res.body?.success ){
              
              localStorage.setItem( 'token', res.headers.get('token') || "" );

              try {
                if( res.body.data ){
                  const dataUser = encryptAndDecrypt.decrypt( res.body.data ) as IdataUser;

                  this._user = dataUser;
                }
              } catch (error) {
                alertSwal.messageError( "Error decrypt" + error );
              }
            }
          }
        ),
        map( res => res.body! ),
        catchError( err => of(err.error) )
      )

  }

  resendCode( username: string ): Observable<IResponseLogin>{
    const url = `${this.baseUrl}/auth/resend-code/${username}`;

    return this.http.get<IResponseLogin>( url )
      .pipe(
        catchError( err => of(err.error) )
      )
  }

  confirmAccount( token: string ): Observable<IResponseLogin>{
    const url = `${this.baseUrl}/auth/confirm/${token}`;

    return this.http.get<IResponseLogin>( url )
      .pipe(
        catchError( err => of(err.error) )
      )
  }

  resetPass( email: { email: string } ): Observable<IResponseLogin>{
    const url = `${this.baseUrl}/auth/restablecerClave`;

    try {
      const encrypt = encryptAndDecrypt.encrypt( email );
      const dataEncrypt: IcredencialesEncrypt = {
        reqEncrypt: encrypt
      };

      return this.http.post<IResponseLogin>( url, dataEncrypt )
        .pipe(
          catchError( err => of(err.error) )
        )

    } catch (error: any) {
      alertSwal.messageError("Error encrypt: " + error);

      return of(error);
    }
  }

}
