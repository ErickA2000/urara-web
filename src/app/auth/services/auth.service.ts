import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, map, catchError, switchMap } from "rxjs/operators";
import { IDataRegister, IResponseLogin, Icredenciales, IcredencialesEncrypt } from 'src/app/interfaces/auth/auth.interface';
import { IdataUser } from 'src/app/interfaces/auth/user.interface';
import alertSwal from 'src/app/utils/alertSwal';
import encryptAndDecrypt from 'src/app/utils/encryptAndDecrypt';
import { environment } from 'src/environments/environment';
import { DeviceService } from './device.service';
import { IResponse } from 'src/app/interfaces/global.interface';
import { TransferDataLocalService } from 'src/app/shared/services/transfer-data-local.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.API_URL + "/s0/api";
  private _user!: IdataUser;

  @Output() inLogin: EventEmitter<boolean> = new EventEmitter();

  get user(){
    return { ...this._user }
  }

  constructor( private http: HttpClient, private deviceService: DeviceService, private transferDataLocalService: TransferDataLocalService,
    private router: Router ) {

      this.transferDataLocalService.dataUser.subscribe(
        user => this._user = user
      );
    }

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
              this.transferDataLocalService.token = res.headers.get('token') || undefined;
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

  validateToken(): Observable<boolean>{
    const url = `${this.baseUrl}/users/perfil`;

    const headers = new HttpHeaders()
      .set( 'token', localStorage.getItem('token') || "" );

    return this.deviceService.verifyDevice()
      .pipe(
        switchMap( (resDevice: IResponse ) => this.http.get<IResponse>( url, { headers } )
          .pipe( 
            map( resUser => {

              if( !resDevice.success ){
                return false;
              }
              
              try {
                const decrypt = encryptAndDecrypt.decrypt( resUser.data as string ) as IdataUser;
                this._user = decrypt;
              } catch (error) {
                alertSwal.messageError( "Error decrypt:" + error );
              }

              return resUser.success
              
            } ),
            catchError( err => {
              console.log("error validate")
              localStorage.removeItem('token');
              return of(false)
            } )
          )
          
        ),
        catchError( err => {
          console.log("Error device:",err)
          return of(false)
        } )
      )
  }

  logout(): Observable<IResponse>{

    return this.deviceService.getDevice()
      .pipe(
        switchMap( ( resDevice: IResponse )=> this.deviceService.updateStateDevice( resDevice.decryptData._id, { estado: "inactiva", activa: false } )
          .pipe(
            map( res => {
              
              this.inLogin.emit(false);
              localStorage.removeItem('token');
              this.router.navigate(['/site/home']);

              return res;
            } ),
            catchError( err => of(err.error) )
          )
        )
      )

  }

}
