import { Component } from '@angular/core';
import { IDeviceView, ISortDevices } from 'src/app/interfaces/auth/device.interface';
import { SharedMethodsService } from 'src/app/shared/services/shared-methods.service';
import { TransferDataLocalService } from 'src/app/shared/services/transfer-data-local.service';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent {

  constructor( private sharedMethodsServi: SharedMethodsService, private transferDataLocalService: TransferDataLocalService ) { }

  public devices?: ISortDevices = this.transferDataLocalService.devices;

  sendDataDevice( device: IDeviceView ){
    this.transferDataLocalService.device = device;
  }

  back(){
    this.sharedMethodsServi.backRoute();
  }

}
