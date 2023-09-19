import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DeviceService } from 'src/app/auth/services/device.service';
import { IDeviceView } from 'src/app/interfaces/auth/device.interface';
import { DialogsService } from 'src/app/shared/services/dialogs.service';
import { SharedMethodsService } from 'src/app/shared/services/shared-methods.service';
import { TransferDataLocalService } from 'src/app/shared/services/transfer-data-local.service';
import alertSwal from 'src/app/utils/alertSwal';

@Component({
  selector: 'app-one-device',
  templateUrl: './one-device.component.html',
  styleUrls: ['./one-device.component.scss']
})
export class OneDeviceComponent implements OnInit{

  public device?: IDeviceView;

  constructor( private sharedMethodService: SharedMethodsService, private transferDataLocalService: TransferDataLocalService,
    private dialogsService: DialogsService, private deviceService: DeviceService, private sharedMethodsService: SharedMethodsService ) { }

  ngOnInit(): void {
    this.device = this.transferDataLocalService.device;
  }

  logout(){
    this.dialogsService.openSpinner();

    this.deviceService.updateStateDevice( this.device?._id!, { estado: "inactiva", activa: false } ).subscribe(
      res => {
        
        this.dialogsService.close();

        if( !res.success ){
          alertSwal.messageError( res.message || "Error al actualizar estado cuenta" )
        }else{
          alertSwal.messageSuccess( "Cerrando sesión", res.message || "" );
          this.sharedMethodService.changeRoute( "/site/account/security" );
        }

    }
    )    
  }

  back(){
    this.sharedMethodService.backRoute();
  }

}
