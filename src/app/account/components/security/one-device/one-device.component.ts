import { Component } from '@angular/core';
import { SharedMethodsService } from 'src/app/shared/services/shared-methods.service';

@Component({
  selector: 'app-one-device',
  templateUrl: './one-device.component.html',
  styleUrls: ['./one-device.component.scss']
})
export class OneDeviceComponent {

  constructor( private sharedMethodService: SharedMethodsService ) { }

  back(){
    this.sharedMethodService.backRoute();
  }

}
