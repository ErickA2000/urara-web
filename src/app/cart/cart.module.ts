import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { CartShoppingComponent } from './pages/cart-shopping/cart-shopping.component';
import { CartRoutingModule } from './cart-routing.module';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { ProductsComponent } from './components/products/products.component';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    CartShoppingComponent,
    OrderSummaryComponent,
    ProductsComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    NgOptimizedImage,
    MaterialModule
  ]
})
export class CartModule { }
