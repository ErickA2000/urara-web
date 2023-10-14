import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ItransferDataOrderSummary } from 'src/app/shared/interfaces/transfer-data';
import { DialogsService } from 'src/app/shared/services/dialogs.service';
import { TransferDataLocalService } from 'src/app/shared/services/transfer-data-local.service';
import { PayMethodsComponent } from '../pay-methods/pay-methods.component';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit, OnDestroy {

  constructor( private transferDataLocalService: TransferDataLocalService, private dialogsService: DialogsService ) { }

  products!: ItransferDataOrderSummary;
  subtotal: number = 0;
  total: number = 0;
  iva: number = 0;
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

  openPayMethods(){
    
    let productTransfor: ItransferDataOrderSummary = {
      productos: []
    };

    //Transformando los precios a entero
    for( let product of this.products.productos ){
      productTransfor.productos.push({
        productID: product.productID,
        tempProduct: product.tempProduct,
        descuento: product.descuento,
        tallasCantidadPrecio: {
          cantidad: product.tallasCantidadPrecio.cantidad,
          talla: product.tallasCantidadPrecio.talla,
          precio: Math.trunc(product.tallasCantidadPrecio.precio),
          idColor: product.tallasCantidadPrecio.idColor
        }
      });
    }

    this.dialogsService.open( PayMethodsComponent, 
      {
        data: { ...productTransfor, 
          subtotal: Math.trunc(this.subtotal),
          total: Math.trunc(this.total),
          iva: this.iva,
          iva_moneda: this.ivaValor
        }
      }   
    )
  }

}
