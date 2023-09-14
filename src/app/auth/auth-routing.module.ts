import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { ForgetPassComponent } from './components/forget-pass/forget-pass.component';
import { Verify2faComponent } from './components/verify2fa/verify2fa.component';
import { RegisterComponent } from './components/register/register.component';
import { ConfirmAccountComponent } from './pages/confirm-account/confirm-account.component';
import { inSesionGuard } from '../guards/in-sesion.guard';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    canActivate: [ inSesionGuard ],
    children: [
      {
        path: '',
        redirectTo: "login",
        pathMatch: "full"
      },
      {
        path: "login",
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: "forgot-password",
        component: ForgetPassComponent
      },
      {
        path: 'verify-2fa',
        component: Verify2faComponent
      }
    ]
  },
  {
    path: "confirm/:token",
    component: ConfirmAccountComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
