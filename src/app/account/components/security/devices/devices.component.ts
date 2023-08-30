import { Component } from '@angular/core';
import { SharedMethodsService } from 'src/app/shared/services/shared-methods.service';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent {

  constructor( private sharedMethodsServi: SharedMethodsService ) { }

  back(){
    this.sharedMethodsServi.backRoute();
  }

}
