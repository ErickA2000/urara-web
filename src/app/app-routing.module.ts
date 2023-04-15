import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './shared/pages/not-found/not-found.component';
import { AboutComponent } from './shared/pages/about/about.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import("./home/home.module").then( m => m.HomeModule )
  },
  {
    path: 'catalogo',
    loadChildren: () => import("./catalogo/catalogo.module").then( m => m.CatalogoModule )
  },
  {
    path: 'not-found', 
    component: NotFoundComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: '**',
    redirectTo: 'not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
