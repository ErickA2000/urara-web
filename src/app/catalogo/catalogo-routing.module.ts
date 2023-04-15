import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './pages/products/products.component';
import { DetailsComponent } from './pages/details/details.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent
  },
  {
    path: 'product/detail/:ref',
    component: DetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogoRoutingModule { }
