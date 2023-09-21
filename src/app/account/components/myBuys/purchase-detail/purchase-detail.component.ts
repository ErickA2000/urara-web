import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ShoppingService } from 'src/app/account/services/shopping.service';
import { PAYMENT_METHODS } from 'src/app/constants/global.constans';
import { IShoppingPopulate } from 'src/app/interfaces/account/shopping.interface';
import { DialogsService } from 'src/app/shared/services/dialogs.service';
import { SharedMethodsService } from 'src/app/shared/services/shared-methods.service';
import alertSwal from 'src/app/utils/alertSwal';

@Component({
  selector: 'app-purchase-detail',
  templateUrl: './purchase-detail.component.html',
  styleUrls: ['./purchase-detail.component.scss']
})
export class PurchaseDetailComponent implements OnInit, OnDestroy {
  _activatePaymentAndShipment: boolean = false;

  private compraID: string | null = '';
  public purchase?: IShoppingPopulate;

  $activatedRouteParams?: Subscription;

  constructor( private sharedMethodServi: SharedMethodsService, private shoppingService: ShoppingService,
    private activatedRoute: ActivatedRoute, private dialogsService: DialogsService ) {}

  ngOnInit(): void {
    
    this.$activatedRouteParams = this.activatedRoute.paramMap.subscribe( params => {
      this.compraID = params.get('compraID');
    });

    this.getShopping();
  }

  ngOnDestroy(): void {
    this.$activatedRouteParams?.unsubscribe();
  }

  getShopping(){
    this.dialogsService.openSpinner();

    this.shoppingService.getOneShopping( this.compraID || "" ).subscribe( res => {
      
      if( res.success ){

        const resData = res.data as IShoppingPopulate;

        this.purchase = resData;

        //revisando tipo de metodo de pago
        if( this.purchase.idPago.metodoPago.includes(PAYMENT_METHODS.account_mercado_pago.en) ){
          this.purchase.idPago.metodoPago = PAYMENT_METHODS.account_mercado_pago.es;
        };

        if( this.purchase.idPago.metodoPago.includes(PAYMENT_METHODS.credit_card.en) ){
          this.purchase.idPago.metodoPago = PAYMENT_METHODS.credit_card.es;
        };

        if( this.purchase.idPago.metodoPago.includes(PAYMENT_METHODS.efecty.en) ){
          this.purchase.idPago.metodoPago = PAYMENT_METHODS.efecty.es;
        };

        if( this.purchase.idPago.metodoPago.includes(PAYMENT_METHODS.pse.en) ){
          this.purchase.idPago.metodoPago = PAYMENT_METHODS.pse.es;
        };

        this.dialogsService.close();

      }else{

        this.dialogsService.close();
        alertSwal.messageError( res.message || "" );

      }

      

    })
  }

  activeDetailPyment(){
    this._activatePaymentAndShipment = !this._activatePaymentAndShipment;
  }

  back(){
    this.sharedMethodServi.backRoute();
  }
}
