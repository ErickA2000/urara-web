import { Component } from '@angular/core';
import { SharedMethodsService } from 'src/app/shared/services/shared-methods.service';

@Component({
  selector: 'app-update-address',
  templateUrl: './update-address.component.html',
  styleUrls: ['./update-address.component.scss']
})
export class UpdateAddressComponent {

  public typesAddress: string[] = [ "casa", "trabajo", "otro" ];
  public typeAddressSelected: string = "";

  constructor( private sharedMethodsService: SharedMethodsService ){}

  selectTypeAddress( typeAddress: string ){
    this.typeAddressSelected = typeAddress;
    
  }

  back(){
    this.sharedMethodsService.backRoute();
  }
}
