import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { HomeAccountComponent } from './pages/home-account/home-account.component';
import { HomePersonalInfoComponent } from './pages/home-personal-info/home-personal-info.component';
import { PersonalInfoComponent } from './components/personal-info/personal-info.component';
import { UpdateBasicInfoComponent } from './components/update-basic-info/update-basic-info.component';
import { UpdateContactInfoComponent } from './components/update-contact-info/update-contact-info.component';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [
    HomeAccountComponent,
    HomePersonalInfoComponent,
    PersonalInfoComponent,
    UpdateBasicInfoComponent,
    UpdateContactInfoComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    MaterialModule
  ]
})
export class AccountModule { }
