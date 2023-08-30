import { Component } from '@angular/core';
import { SharedMethodsService } from 'src/app/shared/services/shared-methods.service';

@Component({
  selector: 'app-purchase-detail',
  templateUrl: './purchase-detail.component.html',
  styleUrls: ['./purchase-detail.component.scss']
})
export class PurchaseDetailComponent {
  _activatePaymentAndShipment: boolean = false;

  constructor( private sharedMethodServi: SharedMethodsService ) {}

  activeDetailPyment(){
    this._activatePaymentAndShipment = !this._activatePaymentAndShipment;
  }

  back(){
    this.sharedMethodServi.backRoute();
  }
}
