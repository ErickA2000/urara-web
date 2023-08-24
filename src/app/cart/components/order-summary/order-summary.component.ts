import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ItransferDataOrderSummary } from 'src/app/shared/interfaces/transfer-data';
import { TransferDataLocalService } from 'src/app/shared/services/transfer-data-local.service';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit, OnDestroy {

  constructor( private transferDataLocalService: TransferDataLocalService ) { }

  products!: ItransferDataOrderSummary;
  subtotal: number = 0;
  total: number = 0;
  iva: number = 19;
  ivaValor: number = 0;

  $transferDataService!: Subscription; 

  ngOnInit(): void {
    this.$transferDataService = this.transferDataLocalService.transferDataOrderSummary.subscribe( (data) => {
    
      this.products = data;

      this.subtotal = 0;
      this.total = 0;
      this.ivaValor = 0;

      for( let product of data.productos ){
        this.subtotal += product.tallasCantidadPrecio.precio * product.tallasCantidadPrecio.cantidad
      }

      // this.ivaValor = this.subtotal * (this.iva/100);
      this.total = this.subtotal + this.ivaValor;

    });
  }

  ngOnDestroy(): void {
      this.$transferDataService.unsubscribe();
  }
}
