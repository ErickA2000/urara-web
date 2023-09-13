import { Injectable } from '@angular/core';
import * as Bowser from 'bowser';
import { IDevice } from 'src/app/interfaces/auth/device.interface';
import { GeolocationService } from 'src/app/shared/services/geolocation.service';
import listCountries from 'src/assets/listCountries.json';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  private countriesList = listCountries;
  private device?: IDevice;

  constructor( private geoLocationService: GeolocationService ) { }

  public createObjDevice( userAgent: string ){
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

        this.device = {
          estado: "activa",
          activa: true,
          dispositivo: osInfo.name || '',
          navegador: browserInfo.name || '',
          ipv4: res.ip || '',
          ubicacion: nameCountry,
          plataform: plataform
        }
        // console.log(this.device)
      }
    )

    return this.device;
  }
}
