import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItransferDataOrderSummary } from 'src/app/shared/interfaces/transfer-data';

@Component({
  selector: 'app-pay-methods',
  templateUrl: './pay-methods.component.html',
  styleUrls: ['./pay-methods.component.scss']
})
export class PayMethodsComponent implements OnInit {

  constructor( @Inject(MAT_DIALOG_DATA) public payData: ItransferDataOrderSummary ) { }

  logoMercadoPago = "assets/img/logos/mercado-pago.webp";
  logoPaypal = "assets/img/logos/paypal.png";

  ngOnInit(): void {
      console.log(this.payData)
  }
}
