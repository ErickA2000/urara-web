import { Injectable } from '@angular/core';
import * as Bowser from 'bowser';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { IDevice } from 'src/app/interfaces/auth/device.interface';
import { IRequestEncrypt, IResponse } from 'src/app/interfaces/global.interface';
import { GeolocationService } from 'src/app/shared/services/geolocation.service';
import listCountries from 'src/assets/listCountries.json';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import encryptAndDecrypt from 'src/app/utils/encryptAndDecrypt';
import { TransferDataLocalService } from 'src/app/shared/services/transfer-data-local.service';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  private countriesList = listCountries;
  private _device?: IDevice;
  private baseUrl = environment.API_URL;

  get device(){
    return { ...this._device }
  }

  constructor( private geoLocationService: GeolocationService, private transferDataLocalService: TransferDataLocalService, private http: HttpClient ) { }

  public createObjDevice( userAgent: string ){

    /**
     * @description
     * En el parametro recibe el userAgent
     */

    const browser = Bowser.getParser( userAgent );
    const browserInfo = browser.getBrowser();
    const osInfo = browser.getOS();
    const plataform = browser.getPlatformType();

    this.geoLocationService.getLocation().subscribe(
      res => {

        let nameCountry: string = "";

        if( res.country ){
          for( let country of this.countriesList.countries ){

            if( res.country === country.code_2 ){
              nameCountry = country.name_es
            }

          }
        }

        this._device = {
          estado: "activa",
          activa: true,
          dispositivo: osInfo.name || '',
          navegador: browserInfo.name || '',
          ipv4: res.ip || '',
          ubicacion: nameCountry,
          plataform: plataform
        }
        
      }
    )
  }

  public addDevice( ): Observable<IResponse>{
    const url = `${this.baseUrl}/devices/add`;
    let headers: HttpHeaders;

    if( this.transferDataLocalService.token ){
      headers = new HttpHeaders()
        .set( 'token', this.transferDataLocalService.token );
    }else{
      headers = new HttpHeaders()
        .set('token', localStorage.getItem('token') || "");
    }
    
    try {
      const encrypt = encryptAndDecrypt.encrypt( this.device );

      const deviceEncrypt: IRequestEncrypt = {
        reqEncrypt: encrypt
      } 

      return this.http.post<IResponse>( url, deviceEncrypt, { headers } )
        .pipe(
          catchError( err => of(err) )
        )
      
    } catch (error: any) {
      return of(error)
    }

  }

  public verifyDevice(): Observable<IResponse>{
    const url = `${this.baseUrl}/devices/verify`;

    const headers = new HttpHeaders()
      .set( 'token', localStorage.getItem('token') || "" );
    
    return this.http.get<IResponse>( url, { headers } )
      .pipe(
        catchError( err => of(err.error) )
      )
  }

  public getDevice(): Observable<IResponse>{
    const url = `${this.baseUrl}/devices/this`;

    const headers = new HttpHeaders()
    .set( 'token', localStorage.getItem('token') || '' );

    return this.http.get<IResponse>( url, { headers } )
      .pipe(
        tap( res => {

          try {
            const decrypt: IDevice = encryptAndDecrypt.decrypt( res.data as string );
            return res.decryptData = decrypt;

          } catch (error: any) {
            return of("Algo va mal:" + error)
          }
        }),
        catchError( err => of(err.error) )
      )
  }

  public getDevices(): Observable<IResponse>{
    const url = `${this.baseUrl}/devices/user`;

    const headers = new HttpHeaders()
    .set('token', localStorage.getItem('token') || "");

    return this.http.get<IResponse>( url, { headers } )
      .pipe(
        tap( res => {

          try {
            const decrypt: IDevice[] = encryptAndDecrypt.decrypt( res.data as string );
            return res.decryptData = decrypt;
            
            
          } catch (error:any) {
            return of( "Algo va mal:"+ error)
          }

        }),
        catchError( err => of(err.error) )
      )
  }

  public updateStateDevice( deviceID: string, state: IDevice ): Observable<IResponse>{
    const url = `${this.baseUrl}/devices/update/${deviceID}`;

    const headers = new HttpHeaders()
    .set( 'token', localStorage.getItem('token') || "" );

    try {
      const encrypt = encryptAndDecrypt.encrypt( state );
      const device: IRequestEncrypt = {
        reqEncrypt: encrypt
      };

      return this.http.put<IResponse>( url, device, { headers } )
        .pipe(
          catchError( err => of(err.error) )
        )

    } catch (error:any) {
      return of(error)
    }
  } 

}
