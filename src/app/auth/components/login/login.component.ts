import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor( private fb: FormBuilder, private authService: AuthService ) {}

  loginForm: FormGroup = this.fb.group({
    username: [ '', [ Validators.required ] ],
    clave: [ '', [ Validators.required ] ]
  });

  login(){

    console.log(this.loginForm.value)

    this.authService.login( this.loginForm.value ).subscribe( 
      res => {
        
      }
    )

  }

}
