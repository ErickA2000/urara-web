import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeAccountComponent } from './pages/home-account/home-account.component';
import { HomePersonalInfoComponent } from './pages/home-personal-info/home-personal-info.component';
import { PersonalInfoComponent } from './components/personal-info/personal-info.component';
import { UpdateBasicInfoComponent } from './components/update-basic-info/update-basic-info.component';
import { UpdateContactInfoComponent } from './components/update-contact-info/update-contact-info.component';

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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
