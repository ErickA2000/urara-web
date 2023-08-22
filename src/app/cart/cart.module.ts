import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { CartShoppingComponent } from './pages/cart-shopping/cart-shopping.component';
import { CartRoutingModule } from './cart-routing.module';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { ProductsComponent } from './components/products/products.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';



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
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class CartModule { }
