import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CartShoppingComponent } from './pages/cart-shopping/cart-shopping.component';
import { StatePaymentComponent } from './pages/state-payment/state-payment.component';

const routes: Routes = [
  {
    path: "",
    component: CartShoppingComponent
  },
  {
    path: "payment/success",
    component: StatePaymentComponent
  },
  {
    path: "payment/pendding",
    component: StatePaymentComponent
  },
  {
    path: "payment/failure",
    component: StatePaymentComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class CartRoutingModule { }
