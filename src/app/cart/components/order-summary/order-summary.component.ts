import { Component, OnInit } from '@angular/core';
import { TransferDataLocalService } from 'src/app/shared/services/transfer-data-local.service';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit {

  constructor( private transferDataLocalService: TransferDataLocalService ) { }

  ngOnInit(): void {
      this.transferDataLocalService.transferDataOrderSummary.subscribe( (data) => console.log("order summary:",data));
  }
}
