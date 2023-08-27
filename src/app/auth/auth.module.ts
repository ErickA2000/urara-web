import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { MaterialModule } from '../material/material.module';
import { ForgetPassComponent } from './components/forget-pass/forget-pass.component';
import { Vefify2faComponent } from './components/vefify2fa/vefify2fa.component';
import { HomeComponent } from './pages/home/home.component';


@NgModule({
  declarations: [
    LoginComponent,
    ForgetPassComponent,
    Vefify2faComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule
  ]
})
export class AuthModule { }
