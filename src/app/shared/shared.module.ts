import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SkeletonLoadingComponent } from './components/skeleton-loading/skeleton-loading.component';
import { CardComponent } from './components/card/card.component';
import { AboutComponent } from './pages/about/about.component';
import { PaginateComponent } from './components/paginate/paginate.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    NotFoundComponent,
    HeaderComponent,
    FooterComponent,
    SkeletonLoadingComponent,
    CardComponent,
    AboutComponent,
    PaginateComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MaterialModule,
    FormsModule
  ],
  exports: [
    NotFoundComponent,
    HeaderComponent,
    FooterComponent,
    SkeletonLoadingComponent,
    CardComponent,
    AboutComponent,
    PaginateComponent
  ]
})
export class SharedModule { }
