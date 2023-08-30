import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeAccountComponent } from './pages/home-account/home-account.component';
import { HomePersonalInfoComponent } from './pages/home-personal-info/home-personal-info.component';
import { PersonalInfoComponent } from './components/personalInfo/personal-info/personal-info.component';
import { UpdateBasicInfoComponent } from './components/personalInfo/update-basic-info/update-basic-info.component';
import { UpdateContactInfoComponent } from './components/personalInfo/update-contact-info/update-contact-info.component';
import { HomeSecurityComponent } from './pages/home-security/home-security.component';
import { HomeMyBuysComponent } from './pages/home-my-buys/home-my-buys.component';
import { SecurityComponent } from './components/security/security.component';
import { TwofaComponent } from './components/security/securityMethods/twofa/twofa.component';
import { DevicesComponent } from './components/security/devices/devices.component';
import { MyBuysComponent } from './components/myBuys/my-buys/my-buys.component';
import { PurchaseDetailComponent } from './components/myBuys/purchase-detail/purchase-detail.component';
import { OneDeviceComponent } from './components/security/one-device/one-device.component';

const routes: Routes = [
  {
    path: "",
    component: HomeAccountComponent,
    children: [
      {
        path: "",
        redirectTo: "personal-info",
        pathMatch: "full"
      },
      {
        path: "personal-info",
        component: HomePersonalInfoComponent,
        children: [
          {
            path: "",
            component: PersonalInfoComponent
          },
          {
            path: "update-basic-info",
            component: UpdateBasicInfoComponent
          },
          {
            path: "update-contact-info",
            component: UpdateContactInfoComponent
          }
        ]
      },
      {
        path: "security",
        component: HomeSecurityComponent,
        children: [
          {
            path: "",
            component: SecurityComponent
          },
          {
            path: "verify-2fa",
            component: TwofaComponent
          },
          {
            path: "devices",
            component: DevicesComponent
          },
          {
            path: "device",
            component: OneDeviceComponent
          }
        ]
      },
      {
        path: "my-buys",
        component: HomeMyBuysComponent,
        children: [
          {
            path: "",
            component: MyBuysComponent
          },
          {
            path: "purchase-detail",
            component: PurchaseDetailComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
