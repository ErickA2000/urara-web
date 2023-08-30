import { Component } from '@angular/core';

@Component({
  selector: 'app-purchase-detail',
  templateUrl: './purchase-detail.component.html',
  styleUrls: ['./purchase-detail.component.scss']
})
export class PurchaseDetailComponent {
  _activatePaymentAndShipment: boolean = false;

  activeDetailPyment(){
    this._activatePaymentAndShipment = !this._activatePaymentAndShipment;
  }
}
