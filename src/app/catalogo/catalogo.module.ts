import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogoRoutingModule } from './catalogo-routing.module';
import { ProductsComponent } from './pages/products/products.component';
import { CardsComponent } from './components/cards/cards.component';
import { FiltersComponent } from './components/filters/filters.component';
import { DetailsComponent } from './pages/details/details.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ProductsComponent,
    CardsComponent,
    FiltersComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    CatalogoRoutingModule,
    SharedModule
  ]
})
export class CatalogoModule { }
