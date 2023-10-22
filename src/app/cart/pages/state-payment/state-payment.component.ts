import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PAYMENT_STATUS } from 'src/app/constants/global.constans';

@Component({
  selector: 'app-state-payment',
  templateUrl: './state-payment.component.html',
  styleUrls: ['./state-payment.component.scss']
})
export class StatePaymentComponent implements OnInit {

  statusPayment: string | null = "";

  allStatusPayment = PAYMENT_STATUS;

  constructor( private router: Router ){}

  ngOnInit(): void {
    
    this.statusPayment = this.router.parseUrl(this.router.url).queryParamMap.get('status');

  }
}
