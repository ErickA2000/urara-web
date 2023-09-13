import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from '../shared/pages/about/about.component';
import { SiteComponent } from './components/site/site.component';
import { noAuthGuard } from '../guards/no-auth.guard';

const routes: Routes = [
  {
    path: "",
    component: SiteComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadChildren: () => import("../home/home.module").then( m => m.HomeModule )
      },
      {
        path: 'catalogo',
        loadChildren: () => import("../catalogo/catalogo.module").then( m => m.CatalogoModule )
      },
      {
        path: 'cart',
        loadChildren: () => import("../cart/cart.module").then( m => m.CartModule ),
        canActivate: [ noAuthGuard ]
      },
      {
        path: 'account',
        loadChildren: () => import("../account/account.module").then( m => m.AccountModule ),
        canActivate: [ noAuthGuard ]
      },
      {
        path: 'abount',
        component: AboutComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SiteRoutingModule { }
