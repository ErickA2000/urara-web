import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CatalogoRoutingModule } from './catalogo-routing.module';
import { ProductsComponent } from './pages/products/products.component';
import { CardsComponent } from './components/cards/cards.component';
import { FiltersComponent } from './components/filters/filters.component';
import { DetailsComponent } from './pages/details/details.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { BottonSheetFilterComponent } from './components/botton-sheet-filter/botton-sheet-filter.component';


@NgModule({
  declarations: [
    ProductsComponent,
    CardsComponent,
    FiltersComponent,
    DetailsComponent,
    BottonSheetFilterComponent
  ],
  imports: [
    CommonModule,
    CatalogoRoutingModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CatalogoModule { }
