import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItransferDataOrderSummary } from 'src/app/shared/interfaces/transfer-data';
import { environment } from 'src/environments/environment';
import { ProductInPayment, RequestPayment } from '../../interfaces/payment.interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import { PaymentService } from '../../services/payment.service';
import alertSwal from 'src/app/utils/alertSwal';
import { SharedMethodsService } from 'src/app/shared/services/shared-methods.service';
import { Idireccion } from 'src/app/interfaces/auth/user.interface';
import { DialogsService } from 'src/app/shared/services/dialogs.service';

@Component({
  selector: 'app-pay-methods',
  templateUrl: './pay-methods.component.html',
  styleUrls: ['./pay-methods.component.scss']
})
export class PayMethodsComponent implements OnInit {

  private id_seller = environment.ID_SELLER;

  constructor( @Inject(MAT_DIALOG_DATA) public payData: ItransferDataOrderSummary, private authService: AuthService, private paymentService: PaymentService,
  private sharedMethodsService: SharedMethodsService, private dialogsService: DialogsService) { }

  logoMercadoPago = "assets/img/logos/mercado-pago.webp";
  logoPaypal = "assets/img/logos/paypal.png";

  ngOnInit(): void {
    
  }

  createPayment( paymentService: "mercadopago" | "paypal" ){

    this.dialogsService.openSpinner();

    let productPayment: ProductInPayment[] = [];
    const dataUser = this.authService.user;
    let direccionFactu: Idireccion = {
      titulo: '',
      pais: '',
      departamento: '',
      ciudad: '',
      barrio: '',
      tipocalle: '',
      callenumero: '',
      numero1: '',
      numero2: '',
      especificacionOpcional: ''
    };

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

    if( dataUser.direcciones === undefined || dataUser.direcciones.length == 0 ){
      alertSwal.messageError("Falta agregar al menos una dirección");

      this.sharedMethodsService.changeRoute('/site/account/personal-info/add-address');
      this.dialogsService.close();
      return;
    }

    if( dataUser.direcciones.length > 1 ){

      for( let direccion of dataUser.direcciones ){

        if( direccion.forInvoice ){
          direccionFactu = {
            titulo: direccion.titulo,
            pais: direccion.pais,
            departamento: direccion.departamento,
            ciudad: direccion.ciudad,
            barrio: direccion.barrio,
            tipocalle: direccion.tipocalle,
            callenumero: direccion.callenumero,
            numero1: direccion.numero1,
            numero2: direccion.numero2,
            especificacionOpcional: direccion.especificacionOpcional
          };

        }
      } 

      if( direccionFactu.titulo === "" ){
        this.dialogsService.close();
        alertSwal.messageError( "No hay dirección de facturacion asignada" );
        this.sharedMethodsService.changeRoute('/site/account');
        return;
      } 

    }else{
      direccionFactu = {
        titulo: dataUser.direcciones[0].titulo,
        pais: dataUser.direcciones[0].pais,
        departamento: dataUser.direcciones[0].departamento,
        ciudad: dataUser.direcciones[0].ciudad,
        barrio: dataUser.direcciones[0].barrio,
        tipocalle: dataUser.direcciones[0].tipocalle,
        callenumero: dataUser.direcciones[0].callenumero,
        numero1: dataUser.direcciones[0].numero1,
        numero2: dataUser.direcciones[0].numero2,
        especificacionOpcional: dataUser.direcciones[0].especificacionOpcional
      };
    }

    const reqBody: RequestPayment = {
      payservice: paymentService,
      vendedor: this.id_seller,
      telefono: this.authService.user.telefono,
      products: productPayment,
      productos: this.payData.productos,
      direccionFacturacion: direccionFactu,
      subtotal: this.payData.subtotal || 0,
      descuento: valorDescuento,
      iva: this.payData.iva || 0,
      iva_moneda: this.payData.iva_moneda || 0,
      total: this.payData.total || 0
    };

    
    this.paymentService.createPayment( reqBody ).subscribe(
      res => {
        
        if( res.success ){
          this.dialogsService.close();
          window.open( res.data?.payUrl, "_self" );
        }else{
          alertSwal.messageError( res.message || "" );
          this.dialogsService.close();
        }

      }
    )
  }
}
