import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor( private fb: FormBuilder ) {}

  loginForm: FormGroup = this.fb.group({
    username: [ '', [ Validators.required ] ],
    clave: [ '', [ Validators.required ] ]
  });

  login(){
    //encriptar datos
    console.log(this.loginForm.value)
  }

}
