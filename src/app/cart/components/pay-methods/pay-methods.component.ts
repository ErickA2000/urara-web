import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItransferDataOrderSummary } from 'src/app/shared/interfaces/transfer-data';
import { environment } from 'src/environments/environment';
import { ProductInPayment, RequestPayment } from '../../interfaces/payment.interface';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-pay-methods',
  templateUrl: './pay-methods.component.html',
  styleUrls: ['./pay-methods.component.scss']
})
export class PayMethodsComponent implements OnInit {

  private id_seller = environment.ID_SELLER;

  constructor( @Inject(MAT_DIALOG_DATA) public payData: ItransferDataOrderSummary, private authService: AuthService) { }

  logoMercadoPago = "assets/img/logos/mercado-pago.webp";
  logoPaypal = "assets/img/logos/paypal.png";

  ngOnInit(): void {
    
  }

  createPayment( paymentService: "mercadopago" | "paypal" ){
    let productPayment: ProductInPayment[] = [];

    //calcular valor descuento
    let valorDescuento: number = 0;
    for( let product of this.payData.productos ){
      if( product.descuento != 0 ){
        valorDescuento += (product.descuento * product.tallasCantidadPrecio.precio ) / 100;
      }

      //Creando arreglo de productos
      productPayment.push({
        title: product.tempProduct?.nombre || "",
        currency_id: 'COP',
        quantity: product.tallasCantidadPrecio.cantidad,
        unit_price: product.tallasCantidadPrecio.precio
      });

      delete product.tempProduct;

    }

    const reqBody: RequestPayment = {
      payservice: paymentService,
      vendedor: this.id_seller,
      telefono: this.authService.user.telefono,
      products: productPayment,
      productos: this.payData.productos,
      direccionFacturacion: this.authService.user.direcciones[0],
      subtotal: this.payData.subtotal || 0,
      descuento: valorDescuento,
      iva: this.payData.iva || 0,
      iva_moneda: this.payData.iva_moneda || 0,
      total: this.payData.total || 0
    };

    console.log(reqBody)
  }
}
