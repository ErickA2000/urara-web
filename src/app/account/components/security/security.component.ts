import { Component, OnInit } from '@angular/core';
import { DialogsService } from 'src/app/shared/services/dialogs.service';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AuthService } from 'src/app/auth/services/auth.service';
import { DeviceService } from 'src/app/auth/services/device.service';
import { IDevice, IDeviceView, ISortDevices } from 'src/app/interfaces/auth/device.interface';
import alertSwal from 'src/app/utils/alertSwal';
import { TransferDataLocalService } from 'src/app/shared/services/transfer-data-local.service';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss']
})
export class SecurityComponent implements OnInit {

  constructor( private dialogService: DialogsService, private authService: AuthService, private deviceService: DeviceService,
    private transferDataLocalService: TransferDataLocalService ) { }

  stateVerify2fa: {
    state: "activa" | "desactivado" | "",
    icon: "check_circle" | "cancel" | ""
  } = {
    state: "",
    icon: ""
  }

  devicesSort?: ISortDevices = {
    linux: [],
    windows: [],
    android: [],
    ios: [],
    other: []
  };

  ngOnInit(): void {
    
    if( this.authService.user.verify2fa.estado ){
      this.stateVerify2fa = {
        state: "activa",
        icon: "check_circle"
      }

    }else{
      this.stateVerify2fa = {
        state: "desactivado",
        icon: "cancel"
      }
    }

    this.getDevices();
  }

  private getDevices(){
    this.dialogService.openSpinner();

    let devices: IDeviceView[] = [];

    this.deviceService.getDevices().subscribe(
      res => {

        if( !res.success ){
          this.dialogService.close();
          alertSwal.messageError( res.message || "" );
        }else{

          const parseJson: IDevice[] = JSON.parse(res.decryptData);

          for( let device of parseJson ){

            if( device.plataform?.toLocaleLowerCase() === "desktop" ){
              
              const tempDevice: IDeviceView = device;
              tempDevice.icon = "computer";
              devices.push(tempDevice);

            }else if( device.plataform?.toLocaleLowerCase() === "mobile" ){

              const tempDevice: IDeviceView = device;
              tempDevice.icon = "smartphone";
              devices.push(tempDevice);

            }else{
              const tempDevice: IDeviceView = device;
              tempDevice.icon = "devices";
              devices.push(tempDevice);
            }

          }

          for( let device of devices ){

            if( device.token == localStorage.getItem('token') ){
              device.thisDevice = true
            }else{
              device.thisDevice = false;
            }

            if( device.dispositivo?.toLowerCase() === "linux" ){
              this.devicesSort?.linux?.push(device);

            }else if( device.dispositivo?.toLowerCase() === "windows" ){
              this.devicesSort?.windows?.push(device);

            }else if( device.dispositivo?.toLowerCase() === "android" ){
              this.devicesSort?.android?.push(device);

            } else if( device.dispositivo?.toLowerCase() === "ios" || device.dispositivo?.toLowerCase() === "macos" ){
              this.devicesSort?.ios?.push(device);

            }else{
              this.devicesSort?.other?.push(device);
            }

          }

          
          this.transferDataLocalService.devices = this.devicesSort;
          this.dialogService.close();

        }

      }
    )
  }

  openDialogChangePass(){
    this.dialogService.open( ChangePasswordComponent )
  }
}
