import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './shared/pages/not-found/not-found.component';
import { AboutComponent } from './shared/pages/about/about.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "site",
    pathMatch: "full"
  },
  {
    path: 'site',
    loadChildren: () => import("./site/site.module").then( m => m.SiteModule )
  },
  {
    path: 'auth',
    loadChildren: () => import("./auth/auth.module").then( m => m.AuthModule )
  },
  {
    path: 'not-found', 
    component: NotFoundComponent
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
