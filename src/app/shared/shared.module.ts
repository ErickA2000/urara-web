import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgOptimizedImage } from '@angular/common';

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
import { SliderComponent } from './components/slider/slider.component';
import { NgxGlideModule } from 'ngx-glide';


@NgModule({
  declarations: [
    NotFoundComponent,
    HeaderComponent,
    FooterComponent,
    SkeletonLoadingComponent,
    CardComponent,
    AboutComponent,
    PaginateComponent,
    
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MaterialModule,
    FormsModule,
    NgxGlideModule,
    SliderComponent,
    NgOptimizedImage
  ],
  exports: [
    NotFoundComponent,
    HeaderComponent,
    FooterComponent,
    SkeletonLoadingComponent,
    CardComponent,
    AboutComponent,
    PaginateComponent,
    SliderComponent
  ]
})
export class SharedModule { }
