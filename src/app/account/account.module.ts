import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { HomeAccountComponent } from './pages/home-account/home-account.component';
import { HomePersonalInfoComponent } from './pages/home-personal-info/home-personal-info.component';
import { PersonalInfoComponent } from './components/personalInfo/personal-info/personal-info.component';
import { UpdateBasicInfoComponent } from './components/personalInfo/update-basic-info/update-basic-info.component';
import { UpdateContactInfoComponent } from './components/personalInfo/update-contact-info/update-contact-info.component';
import { MaterialModule } from '../material/material.module';
import { HomeSecurityComponent } from './pages/home-security/home-security.component';
import { HomeMyBuysComponent } from './pages/home-my-buys/home-my-buys.component';
import { SecurityComponent } from './components/security/security.component';
import { TwofaComponent } from './components/security/securityMethods/twofa/twofa.component';
import { DevicesComponent } from './components/security/devices/devices.component';
import { MyBuysComponent } from './components/myBuys/my-buys/my-buys.component';
import { BuysComponent } from './components/myBuys/buys/buys.component';
import { PurchaseDetailComponent } from './components/myBuys/purchase-detail/purchase-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ChangePasswordComponent } from './components/security/change-password/change-password.component';
import { OneDeviceComponent } from './components/security/one-device/one-device.component';
import { SharedModule } from '../shared/shared.module';
import { UpdateAddressComponent } from './components/personalInfo/update-address/update-address.component';


@NgModule({
  declarations: [
    HomeAccountComponent,
    HomePersonalInfoComponent,
    PersonalInfoComponent,
    UpdateBasicInfoComponent,
    UpdateContactInfoComponent,
    HomeSecurityComponent,
    HomeMyBuysComponent,
    SecurityComponent,
    TwofaComponent,
    DevicesComponent,
    MyBuysComponent,
    BuysComponent,
    PurchaseDetailComponent,
    ChangePasswordComponent,
    OneDeviceComponent,
    UpdateAddressComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AccountModule { }
